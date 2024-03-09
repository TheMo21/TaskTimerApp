import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req:NextApiRequest, res:NextApiResponse) {
    if(req.method==="GET"){
        res.json({events: {
            title: "event 1",
            deadline: now,
            tasks: ["this is task 1", "this is task 2"],
          },
          { title: "event 2", deadline: now, tasks: ["this is task 2"] },
          { title: "event 3", deadline: now, tasks: ["this is task 3"] },
          { title: "event 4", deadline: now, tasks: ["this is task 4"] }})
    }
}