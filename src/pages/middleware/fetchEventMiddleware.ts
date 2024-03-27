import { ScheduleEventModel } from "@/app/model/ScheduleEventModel";
import { UserModel } from "@/app/model/UserModel";
import ScheduleEvent from "@/app/types/ScheduleEvent";
import User from "@/app/types/User";
import { NextApiRequest, NextApiResponse } from "next";

export const getEvents = async (
  req: any,
  res: NextApiResponse,
  next: () => void
) => {
  //get user id from request
  const { userId } = req.userId;
  //get user document from database
  const user = (await UserModel.findById(userId)) as User;
  //get array of event ids from user document
  const eventIds = user.events;
  //gets an array of schedule events from each event id
  const result = await Promise.all(
    eventIds.map(async (eventId) => await ScheduleEventModel.findById(eventId))
  );

  req.events = result;
  next();
};
