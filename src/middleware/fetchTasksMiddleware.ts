import { TaskModel } from "@/app/model/TaskModel";

import { NextApiResponse } from "next";

export const fetchTaskMiddleware = async (
  req: any,
  res: NextApiResponse,
  next: () => void
) => {
  //get user id from request
  const userId = req.userId;
  //get array of tasks based on userId field
  const tasks = await TaskModel.find({ userId: userId });
  const result = tasks.map((doc) => ({
    _id: doc._id,
    title: doc.title,
    group: doc.group,
  }));

  req.tasks = result;
  next();
};
