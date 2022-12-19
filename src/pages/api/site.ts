/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next"

import { Site } from "src/constants/models"
import parse from "src/constants/models/parse"
import { addSite, getSites, updateSite } from "src/lib/api/site"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Site[] | Site | { error: string }>
) {
  try {
    switch (req.method) {
      case "POST": {
        const site = parse(req.body, "site") as Site
        const result = await addSite(site)

        if (result.acknowledged) res.status(200).json(site)
        else res.status(500).json({ error: "Error adding site" })
        break
      }
      case "PUT": {
        const site = parse(req.body, "site") as Site
        const result = await updateSite(site)

        if (result.acknowledged) res.status(200).json(site)
        else res.status(500).json({ error: "Error updating site" })
        break
      }
      default:
        res.status(405).end()
    }
  } catch (e: any) {
    res.status(500).json({ error: e.message })
  }
}
