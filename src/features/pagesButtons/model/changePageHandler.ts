import React from "react";

export function changePageHandler(setCurrentPage: React.Dispatch<React.SetStateAction<number>>, page: number) {
    setCurrentPage(page);
}
