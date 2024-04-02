import { useStopwatch } from "react-timer-hook";
import Record from "../types/RecordType";
import { format } from "date-fns";

interface Props {
  taskTitle: string;
  taskGroup: string;
  postRecord: any;
}
export default function Timer({ taskTitle, taskGroup, postRecord }: Props) {
  const { seconds, minutes, hours, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: false });

  const time = `${hours}:${minutes}:${seconds}`;

  return (
    <>
      {isRunning ? (
        <>
          <span className="text-xl">{time}</span>
          <button
            onClick={async () => {
              pause();
              const record: Record = {
                userId: "",
                taskTitle: taskTitle,
                taskGroup: taskGroup,
                date: format(new Date(), "yyyy-MM-dd"),
                duration: time,
              };
              await postRecord(JSON.stringify(record));
              reset(undefined, false);
            }}
          >
            Stop
          </button>
        </>
      ) : (
        <button
          onClick={() => {
            start();
          }}
        >
          Start
        </button>
      )}
    </>
  );
}
