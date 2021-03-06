import ordersModel from "../../../dataAccess/entityModels/orders";
import { OrderFilter } from "../../shared/filterModels/orderFilterModel";
import { BaseResponse } from "../../shared/models/baseResponse";



export async function createOrder(orderParam: ordersModel): Promise<boolean> {
    const result = await ordersModel.create(orderParam);

    if (result == null) {
        return false
    }

    return true;
}

export async function getOrdersForAdmin(filter: OrderFilter): Promise<BaseResponse<ordersModel>> {
    let query;
    let count;
    let data = new Array<ordersModel>();
    query = ordersModel.find().populate("user_id").populate("items.printing_edition_id");

    const options = {
        sort: "_id",
        lean: true,
        page: filter.pageNumber,
        limit: filter.pageSize,
    }
    await ordersModel.paginate(query, options).then(function (result) {
        count = result.total
        data = result.docs
    }).catch();
    const response: BaseResponse<ordersModel> = { data: data, count: count }
    return response;
}

export async function getOrdersForUser(id: string): Promise<Array<ordersModel>> {

    const result = await ordersModel.find({ user_id: id }).populate("items.printing_edition_id");

    if (result.length == 0) {
        return null
    }

    return result;
}