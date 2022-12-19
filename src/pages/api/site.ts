import type { NextApiRequest, NextApiResponse } from "next"

import parse from "src/lib/parse"
import { Site } from "src/constants/models"
import { addSite, updateSite } from "src/lib/api/site"

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Site[] | Site | { error: string }>
) => {
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    res.status(500).json({ error: e.message })
  }
}

export default handler
