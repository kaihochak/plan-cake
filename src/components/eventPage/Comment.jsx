// import DeleteThread from "../forms/DeleteThread";
import { Link, useNavigate } from "react-router-dom"


const Comment = ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
}) => {
  return (
    <article
      className={`flex w-full flex-col rounded-xl ${
        isComment ? "px-0 xs:px-7" : "bg-dark-2 "
      }`}
    >
      <div className='flex items-start justify-between'>
        <div className='flex w-full flex-1 flex-row gap-4 md:gap-6'>
          <div className='flex flex-col items-center '>
            <Link href={`/profile/${author?.id}`} className='relative h-11 w-11 md:h-14 md:w-14'>
              <img
                src={author?.image}
                alt='user_community_image'
                className='cursor-pointer rounded-full w-full h-full object-cover'
              />
            </Link>

            <div className='thread-card_bar' />
          </div>

          <div className='flex w-full flex-col gap-1'>
            <div className="flex flex-row gap-3 text-m-m">
              <Link href={`/profile/${author?.id}`} className='w-fit'>
                <h4 className='cursor-pointer'>
                  {author?.name}
                </h4>
              </Link>
              <p className=' text-border'>
              {(createdAt)}
              </p>
            </div>

            <p className='text-m-m'>{content}</p>

            <div className={`${isComment && "mb-10"} flex flex-col gap-3 mt-2`}>
              <div className='flex gap-3.5'>
                <img
                  src='/assets/icons/heart-gray.svg'
                  alt='heart'
                  className='w-6 h-6 md:w-8 md:h-8 cursor-pointer object-contain'
                />
                <Link href={`/thread/${id}`}>
                  <img
                    src='/assets/icons/reply.svg'
                    alt='heart'
                    className='w-6 h-6 md:w-8 md:h-8 cursor-pointer object-contain'
                  />
                </Link>
                <img
                  src='/assets/icons/repost.svg'
                  alt='heart'
                  className='w-6 h-6 md:w-8 md:h-8 cursor-pointer object-contain'
                />
                <img
                  src='/assets/icons/share.svg'
                  alt='heart'
                  className='w-6 h-6 md:w-8 md:h-8 cursor-pointer object-contain'
                />
              </div>

              {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className='mt-1 text-subtle-medium text-gray-1'>
                    {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* <DeleteThread
          threadId={JSON.stringify(id)}
          currentUserId={currentUserId}
          authorId={author?.id}
          parentId={parentId}
          isComment={isComment}
        /> */}
      </div>

      {!isComment && comments.length > 0 && (
        <div className='ml-1 mt-3 flex items-center gap-2 md:gap-8'>
          {comments.slice(0, 2).map((comment, index) => (
            <img
              key={index}
              src={comment.author?.image}
              alt={`user_${index}`}
              width={24}
              height={24}
              className={`${index !== 0 && "-ml-5"} w-8 h-8 rounded-full object-cover md:h-10 md:w-10`}
            />
          ))}

          <Link href={`/thread/${id}`}>
            <p className='mt-1 text-subtle-medium text-gray-1'>
              {comments.length} repl{comments.length > 1 ? "ies" : "y"}
            </p>
          </Link>
        </div>
      )}
    </article>
  );
}

export default Comment;