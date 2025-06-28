import {CANVAS_TOKEN} from "@/utils/constants/constants.js";

export const getCanvasToken = () => {
  return localStorage.getItem(CANVAS_TOKEN)
}
