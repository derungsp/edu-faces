"use client";

import Link from "next/link";
import { Button } from "../button";
import { useFormState, useFormStatus } from "react-dom";
import { createPost } from "@/app/lib/actions";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export default function CreatePostForm({ userId }: { userId: string }) {
  const initialState = { message: null, errors: {} };
  const createPostWithUserId = createPost.bind(null, userId);
  const [state, dispatch] = useFormState(createPostWithUserId, initialState);

  return (
    <div className="flex flex-col items-center justify-center gap-8 rounded-lg border bg-white px-4 py-10 shadow-sm lg:w-[600px]">
      <form
        action={dispatch}
        className="flex w-full flex-col items-start justify-center gap-2 px-4"
      >
        <div className="flex w-full flex-col items-start justify-center gap-1">
          <label
            className="block text-xs font-medium text-indigo-950"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="peer block w-full rounded-md border border-indigo-200 p-4 text-sm text-indigo-950 outline-2 placeholder:text-gray-500"
            id="title"
            name="title"
            placeholder="Title"
            aria-describedby="title-error"
          />

          <div
            id="title-error"
            aria-live="polite"
            className="h-8 text-sm text-red-500"
          >
            {state.errors?.title && (
              <>
                {state.errors.title.map((error: string) => (
                  <p key={error}>{error}</p>
                ))}
              </>
            )}
          </div>
        </div>
        <div className="flex w-full flex-col items-start justify-center gap-1">
          <label
            className="block text-xs font-medium text-indigo-950"
            htmlFor="content"
          >
            Content
          </label>
          <textarea
            className="peer block h-40 w-full resize-y rounded-md border border-indigo-200 p-4 text-sm text-indigo-950 outline-2 placeholder:text-gray-500"
            id="content"
            name="content"
            placeholder="Content"
            aria-describedby="content-error"
          />

          <div
            id="content-error"
            aria-live="polite"
            className="h-8 text-sm text-red-500"
          >
            {state.errors?.content && (
              <>
                {state.errors.content.map((error: string) => (
                  <p key={error}>{error}</p>
                ))}
              </>
            )}
          </div>
        </div>

        <div className="flex w-full items-center justify-between gap-2">
          <div
            aria-live="polite"
            className="flex h-8 items-center gap-1 text-sm text-red-500"
          >
            {state.message && (
              <>
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                <p>{state.message}</p>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <CreatePostButton />

            <Link
              href="/dashboard/posts"
              className="h-10 rounded-lg border bg-white px-4 py-2 text-indigo-500 shadow-sm hover:bg-indigo-500 hover:text-white focus-visible:outline-indigo-500 active:bg-indigo-600"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

const CreatePostButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      aria-disabled={pending}
      className="border bg-indigo-400 px-4 py-2 text-white shadow-sm hover:bg-indigo-900 focus-visible:outline-indigo-500 active:bg-indigo-600"
    >
      Create Post
    </Button>
  );
};
