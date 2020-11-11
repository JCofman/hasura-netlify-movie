import Image from 'next/image'

type KeyWord = {
  id: number
  name: string
}

type MovieProps = {
  title: string
  overview: string
  rating: number
  poster: string
  id: number
  likes?: number
  keywords: KeyWord[]
  onAddMovieToFavorites?: () => Promise<void>
  onLikeMovie?: (id: number) => Promise<void>
}

const Movie = ({
  id,
  title,
  poster = 'https://picsum.photos/seed/picsum/200/300',
  rating,
  overview,
  keywords,
  likes,
  onAddMovieToFavorites,
  onLikeMovie,
}: MovieProps): JSX.Element => {
  return (
    <div
      key={id}
      className="max-w-sm border rounded-lg overflow-hidden shadow-lg flex flex-col"
    >
      <Image
        layout="responsive"
        width={300}
        height={400}
        src={poster}
        alt={title}
      />
      <div className="px-6 py-4">
        <h3 className="font-semi-bold text-xl mb-2">{title}</h3>
        <p className="text-gray-700 text-base">
          <span className="clamp-3">{overview}</span>
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-8 h-8 mr-2"
          >
            <circle cx="12" cy="12" r="10" className="primary" />
            <path
              className="secondary"
              d="M9.53 16.93a1 1 0 0 1-1.45-1.05l.47-2.76-2-1.95a1 1 0 0 1 .55-1.7l2.77-.4 1.23-2.51a1 1 0 0 1 1.8 0l1.23 2.5 2.77.4a1 1 0 0 1 .55 1.71l-2 1.95.47 2.76a1 1 0 0 1-1.45 1.05L12 15.63l-2.47 1.3z"
            />
          </svg>
          <span className="text-4xl text-indigo-400">{rating}</span>{' '}
          <span className="text-lg text-gray-600">/ 10</span>
        </div>
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 mr-2"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" className="primary" />
            <path
              className="secondary"
              d="M12.88 8.88a3 3 0 1 1 4.24 4.24l-4.41 4.42a1 1 0 0 1-1.42 0l-4.41-4.42a3 3 0 1 1 4.24-4.24l.88.88.88-.88z"
            />
          </svg>
          <span className="text-4xl text-indigo-400">{likes}</span>
        </div>
      </div>
      <div className="px-6 pt-4 pb-2 mb-8">
        {keywords.map((keyword) => {
          return (
            <span
              key={keyword.id}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              #{keyword.name}
            </span>
          )
        })}
      </div>
      <div className="flex mt-6 px-8 pb-8 justify-center mt-auto">
        {onAddMovieToFavorites ? (
          <button
            onClick={onAddMovieToFavorites}
            className="bg-grey-light shadow-lg hover:bg-grey text-gray-700 font-bold py-2 px-4 rounded inline-flex items-center uppercase bg-gray-200 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 mr-2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" className="primary" />
              <path
                className="secondary"
                d="M12.88 8.88a3 3 0 1 1 4.24 4.24l-4.41 4.42a1 1 0 0 1-1.42 0l-4.41-4.42a3 3 0 1 1 4.24-4.24l.88.88.88-.88z"
              />
            </svg>
            <span className="text-sm uppercase tracking-wider font-semibold">
              Add as Favorite
            </span>
          </button>
        ) : (
          <button
            onClick={() => onLikeMovie(id)}
            className="bg-grey-light shadow-lg hover:bg-grey text-gray-700 font-bold py-2 px-4 rounded inline-flex items-center uppercase bg-gray-200 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 mr-2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" className="primary" />
              <path
                className="secondary"
                d="M12.88 8.88a3 3 0 1 1 4.24 4.24l-4.41 4.42a1 1 0 0 1-1.42 0l-4.41-4.42a3 3 0 1 1 4.24-4.24l.88.88.88-.88z"
              />
            </svg>
            <span className="text-sm uppercase tracking-wider font-semibold">
              Like
            </span>
          </button>
        )}
      </div>
    </div>
  )
}

export default Movie
