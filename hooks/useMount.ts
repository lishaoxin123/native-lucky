import React, { useEffect } from "react";

export const useMount = (callback:Function) => {
  useEffect(() => {
    if (callback) {
      callback()
    }
  }, [])
}
