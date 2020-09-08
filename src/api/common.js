import request from "@/utils/request";

export function getTimes() {
  return request({
    url: "/times"
  });
}
export function getStatus() {
  return request({
    url: "/status"
  });
}
export function getDoctors() {
  return request({
    url: "/doctors"
  });
}
