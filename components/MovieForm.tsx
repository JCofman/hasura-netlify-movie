import * as React from 'react'

const MovieForm = ({
  movieName: externalMovieName,
  initialMovieName = externalMovieName || '',
  onSubmit,
}: {
  movieName: string
  initialMovieName?: string
  onSubmit: (movieName: string) => void
}): JSX.Element => {
  const [movieName, setMovieName] = React.useState(initialMovieName)

  React.useEffect(() => {
    // note that because it's a string value, if the externalPokemonName
    // is the same as the one we're managing, this will not trigger a re-render
    if (typeof externalMovieName === 'string') {
      setMovieName(externalMovieName)
    }
  }, [externalMovieName])

  const handleChange = (e) => {
    setMovieName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(movieName)
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 w-full max-w-sm">
      <div className="flex items-center border-b border-indigo-500 py-2">
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          id="pokemonName-input"
          name="pokemonName"
          placeholder="Movie Name..."
          value={movieName}
          onChange={handleChange}
        />{' '}
        <button
          type="submit"
          className="flex-shrink-0 bg-indigo-500 hover:bg-indigo-700 border-indigo-500 hover:border-indigo-700 text-sm border-4 text-white py-1 px-2 rounded"
        >
          Search
        </button>
        <button
          disabled={!movieName.length}
          className="flex-shrink-0 border-transparent border-4 text-indigo-500 hover:text-indigo-800 text-sm py-1 px-2 rounded"
        >
          Cancel
        </button>
      </div>

      <div></div>
    </form>
  )
}

export default MovieForm
