import { ETabId } from "./tabs";

export interface image {
    altText: string;
    path: string;
}

export const imageRoutingMapping: Record<ETabId, image> = {
    [ETabId.introduction]: { altText: "Introduction", path: "images/placeholder.png" },
    [ETabId.experience]: { altText: "Experience", path: "images/placeholder.png" },
    [ETabId.education]: { altText: "Education", path: "images/placeholder.png" },
    [ETabId.skills]: { altText: "Skills", path: "images/placeholder.png" },
    [ETabId.documents]: { altText: "Documents", path: "images/placeholder.png" },
    [ETabId.contact]: { altText: "Contact", path: "images/placeholder.png" },
};