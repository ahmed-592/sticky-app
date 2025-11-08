

import { Card, CardHeader, CardBody, Divider, CardFooter, CircularProgress } from "@heroui/react";
import UpdateNote from "./updateNote";
import { daleteNote } from "../Services/Notes";
import { useState } from "react";

export default function NoteCard({ note, callbackDelete, callbackUpdate }) {
    const [loading, setLoading] = useState(false);

    async function deleteUserNote() {
        setLoading(true);
        await daleteNote(note._id);
        await callbackDelete(note._id);
        setLoading(false);
    }

    return <>
        <Card>
            <CardHeader className="flex justify-between items-center">

                <h3 className="text-lg">{note.title}</h3>

                <div>
                    <p className="text-small opacity-50">{new Date(note.updatedAt)
                        .toLocaleString("en-GB", { timeZone: "Africa/Cairo", hour12: 1, weekday: "long", hour: "numeric", minute: "2-digit" })
                        .replace(",", "")}</p>


                    <p className="text-small opacity-50">{new Date(note.updatedAt)
                        .toLocaleString("en-GB", { timeZone: "Africa/Cairo", hour12: 1, day: "numeric", month: "short", year: "numeric" })
                        .replace(",", "")}</p>
                </div>


            </CardHeader>
            <Divider />
            <CardBody>
                <p>{note.content}</p>
            </CardBody>
            <Divider />
            <CardFooter className="justify-end gap-3">
                <UpdateNote note={note} callbackUpdate={callbackUpdate} />
                {loading ? <CircularProgress aria-label="Loading..." color="danger" size="sm" /> : <svg onClick={deleteUserNote} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 cursor-pointer text-red-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>}



            </CardFooter>

        </Card>

    </>
}






