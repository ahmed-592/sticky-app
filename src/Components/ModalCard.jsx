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
import { useForm } from "react-hook-form";

import {useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../Schema/dataScema";
import { addNote } from "../Services/Notes";

export default function ModalCard({callback}) {

  const { isOpen, onOpen, onOpenChange , onClose } = useDisclosure();




  const [loading, setLoading] = useState(false);

  const { handleSubmit, register, formState: { errors } , reset} = useForm({
    defaultValues: {

      title: "",
      content: ""

    },
    resolver: zodResolver(schema)
  });



  async function AddUserNote(data) {

    try {
      setLoading(true);


      const res = await addNote(data);

      console.log(res);

    } catch (err) {
      console.log(err);


    } finally {
      setLoading(false);
      onClose();
      reset();
      await callback();
    }
  }


  return (
    <>
      <Button onPress={onOpen} color="primary" className="text-xl"> <span className="text-2xl">+</span> Add Note</Button>
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
              <ModalHeader className="flex flex-col gap-1">Add Note</ModalHeader>
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
                      Close
                    </Button>
                    <Button color="primary" type="submit" isLoading={loading}>
                      Add
                    </Button>
                  </div>


                </form>

              </ModalBody>

            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
