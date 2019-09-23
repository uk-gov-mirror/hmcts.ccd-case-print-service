import { get } from "config";
import { fetch } from "../util/fetch";
import * as userReqAuth from "../user/user-request-authorizer";

export function getCase(req, cid) {
  const url = get("case_data_store_url") + "/cases/" + cid;
  const authorization = req.get(userReqAuth.AUTHORIZATION);
  return fetch(url, {
                      headers: {
                        "Authorization": authorization,
                        "Content-Type": "application/json",
                        "ServiceAuthorization": req.headers.ServiceAuthorization,
                      },
                      method: "GET",
                    })
    .then((res) => res.json());
}
