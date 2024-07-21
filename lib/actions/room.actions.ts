"use server";

import { nanoid } from "nanoid";
import { liveblocks } from "../liveblocks";
import { revalidatePath } from "next/cache";
import { parseStringify } from "../utils";
//create doc

export const createDocument = async ({ userId, email }: CreateDocumentParams) => {
  //when a user creates a document, we need to create a room for that document
  const roomId = nanoid();

  try {
    //create a metadata object that will be stored in the room,
    const metadata = {
      creatorId: userId,
      email,
      title: "Untitled",
    };

    const usersAccesses: RoomAccesses = {
      [email]: ["room:write"],
    };
    //create a room with default accesses
    const room = await liveblocks.createRoom(roomId, {
      metadata,
      usersAccesses,
      defaultAccesses: ["room:write"],
    });

    //revalidate path for the home page
    revalidatePath("/");

    return parseStringify(room);
  } catch (error) {
    console.log(`Error happened while creating a room: ${error}`);
  }
};

export const getDocument = async ({ roomId, userId }: { roomId: string; userId: string }) => {
  try {
    //get the room by id
    const room = await liveblocks.getRoom(roomId);
    //if the room does not exist, return null
    // const hasAccess = Object.keys(room.usersAccesses).includes(userId);
    // if (!hasAccess) {
    //   throw new Error("User does not have access to the room");
    // }

    return parseStringify(room);
  } catch (error) {
    console.log(`Error happened while getting a room: ${error}`);
  }
};
export const getDocuments = async (email: string) => {
  try {
    //get the room by id
    const rooms = await liveblocks.getRooms({ userId: email });
    //if the room does not exist, return null
    // const hasAccess = Object.keys(room.usersAccesses).includes(userId);
    // if (!hasAccess) {
    //   throw new Error("User does not have access to the room");
    // }

    return parseStringify(rooms);
  } catch (error) {
    console.log(`Error happened while getting a rooms: ${error}`);
  }
};

export const updateDocument = async (roomId: string, title: string) => {
  try {
    const updatedRoom = await liveblocks.updateRoom(roomId, {
      metadata: {
        title,
      },
    });
    revalidatePath(`/documents/${roomId}`);
    return parseStringify(updatedRoom);
  } catch (error) {
    console.log(`Error happened while updating a room: ${error}`);
  }
};
