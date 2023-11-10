import { createClient } from "next-sanity";

export const client = createClient
    ({
        projectId: 'k43jp74h',
        dataset: "production",
        apiVersion: "2023-11-10",
        useCdn: true,
    })
