import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
    useDisclosure,
    Input,
    Textarea,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { schema } from "../Schema/dataScema";
import { updateNote } from "../Services/Notes";

export default function UpdateNote({ note, callbackUpdate }) {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();


    const [loading, setLoading] = useState(false);

    const { handleSubmit, register, formState: { errors }, reset, setValue } = useForm({
        defaultValues: {

            title: "",
            content: ""

        },
        resolver: zodResolver(schema)
    });



    async function AddUserNote(data) {

        try {
            setLoading(true);


            const res = await updateNote(note._id, data);

            console.log(res);

        } catch (err) {
            console.log(err);


        } finally {
            setLoading(false);
            onClose();
            reset();
            await callbackUpdate();
        }
    }


    useEffect(() => {
        if (note?.title && note?.content) {
            setValue("title", note.title);
            setValue("content", note.content);
        }
    }, [note, setValue]);

    return (
        <>
            <svg onClick={onOpen} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 cursor-pointer text-blue-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
            <Modal
                backdrop="opaque"
                classNames={{
                    backdrop: "bg-linear-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
                }}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Update Note</ModalHeader>
                            <ModalBody>
                                <form className="flex flex-col gap-4" onSubmit={handleSubmit(AddUserNote)}>

                                    <Input

                                        isRequired
                                        variant="bordered"
                                        type="text"
                                        placeholder="Note title"
                                        {...register("title")}
                                    />
                                    <Textarea

                                        placeholder="Note content"
                                        {...register("content")}
                                        variant="bordered"
                                        minRows={6}
                                    />
                                    <div className="flex justify-end gap-2">
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            Cancle
                                        </Button>
                                        <Button color="primary" type="submit" isLoading={loading}>
                                            Update
                                        </Button>
                                    </div>


                                </form>

                            </ModalBody>

                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
