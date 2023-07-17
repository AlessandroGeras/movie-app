import { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import Navbar from '../../components/navbar';
import { RiArrowDownSFill } from 'react-icons/ri';
import { CircularProgressbar } from 'react-circular-progressbar';
import { buildStyles } from 'react-circular-progressbar';
import { IoListCircle } from 'react-icons/io5';
import { BiSolidHeartCircle } from 'react-icons/bi';
import { MdFlagCircle } from 'react-icons/md';
import { MdStars } from 'react-icons/md';
import { BiSolidChevronRight } from 'react-icons/bi';
import { FaFacebook, FaTwitter, FaInstagram, } from 'react-icons/fa';
import { BsLink } from 'react-icons/bs';
import dotenv from 'dotenv';

dotenv.config();

/*
Movie Page
Hidden API key
*/

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  backdrop_path: string;
  genres: Genre[];
  certification?: string;
  runtime: number;
  tagline: string;
  overview: string;
  status: string;
  original_language: string;
}

interface Genre {
  id: number;
  name: string;
}

interface Character {
  id: number;
  name: string;
  characterName: string;
  profilePath: string | null;
}

const SocialIcons = [
  { icon: <FaFacebook size={20} />, key: 'facebook' },
  { icon: <FaTwitter size={20} />, key: 'twitter' },
  { icon: <FaInstagram size={20} />, key: 'instagram' },
  { icon: <BsLink size={20} />, key: 'link' },
];

const MoviePage: React.FC = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(-1);
  const [certification, setCertification] = useState<string | undefined>(undefined);
  const [directors, setDirectors] = useState<string[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [firstCharacter, setFirstCharacter] = useState<Character | null>(null);

  const api_image = 'https://image.tmdb.org/t/p/original';
  const api_key = `api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
  const api_database = 'https://api.themoviedb.org/3';

  useEffect(() => {
    const id = Number(window.location.pathname.split('/').pop());

    const api_movie = `/movie/${id}?`;
    const query_movie = api_database + api_movie + api_key;

    axios
      .get(query_movie)
      .then((response) => {
        const movieData: Movie = response.data;
        setMovie(movieData);
        console.log(movieData);

        if (response.data.certification) {
          setCertification(response.data.certification);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(`${api_database}/movie/${id}/credits?${api_key}`)
      .then((response) => {
        const movieDirectors = response.data.crew.filter(
          (crewMember: any) => crewMember.job === 'Director'
        );

        const directorNames = movieDirectors.map((director: any) => director.name);
        setDirectors(directorNames);

        const movieCharacters = response.data.cast.map((castMember: any) => ({
          id: castMember.id,
          name: castMember.name,
          characterName: castMember.character,
          profilePath: castMember.profile_path,
        }));
        setCharacters(movieCharacters);

        if (movieCharacters.length > 0) {
          setFirstCharacter(movieCharacters[0]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleTabClick = (index: number) => {
    setSelectedTabIndex(index);
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  const formattedDate = format(new Date(movie.release_date), 'yyyy');
  const oldformattedDate = format(new Date(movie.release_date), 'MM/dd/yyyy');

  const formatRuntime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center space-x-4">
        {['Overview', 'Media', 'Fandom', 'Share'].map((tab, index) => (
          <div
            key={index}
            className={`border-b-4 ${selectedTabIndex === index ? 'border-blue-300' : 'border-white'
              } flex items-center justify-center py-4 cursor-pointer`}
            onClick={() => handleTabClick(index)}
          >
            <span className="ml-1 font-semibold">{tab}</span>
            <button className="focus:outline-none mr-1">
              <RiArrowDownSFill size="24px" />
            </button>
          </div>
        ))}
      </div>

      <div className="inline-block h-[450px] relative" style={{ width: '100%' }}>
        <div
          className="absolute top-0 left-0 w-full h-[450px]"
          style={{
            backgroundImage: `url(${api_image + movie.backdrop_path})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(50%)',
          }}
        />
        <div className="absolute flex">
          <img
            className="ml-0"
            src={api_image + movie.poster_path}
            alt={movie.title}
            style={{ width: '450px', height: '450px', objectFit: 'contain', padding: '30px 0', margin: '0 -90px 0 -50px' }}
          />
          <div className="text-white ml-10 w-[72%] h-screen flex items-center justify-center h-[449px]">
            <div>
              <span className="text-2xl font-semibold">{movie.title}</span>
              <span className="text-2xl text-gray-300">
                {' '}
                {certification && <span>Age Rating: {certification}</span>}({formattedDate})
              </span>
              <p>
                <span className="text-sm">
                  {oldformattedDate} ({movie.original_language.toUpperCase()})
                </span>
                <span
                  className="text-sm"
                  style={{
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    display: 'inline-block',
                    margin: '0 5px',
                    verticalAlign: 'middle',
                  }}
                />
                <span className="text-sm">{movie.genres.map((genre, index) => (
                  <span key={genre.id}>
                    {index !== 0 && ', '}
                    {genre.name}
                  </span>
                ))}</span>
                <span
                  style={{
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    display: 'inline-block',
                    margin: '0 5px',
                    verticalAlign: 'middle',
                  }}
                />
                <span className="text-sm">{formatRuntime(movie.runtime)}</span>
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 mt-4">
                  <CircularProgressbar
                    value={Math.round(movie.vote_average * 10)}
                    text={`${Math.round(movie.vote_average * 10)}%`}
                    background
                    backgroundPadding={0}
                    styles={buildStyles({
                      backgroundColor: 'black',
                      textColor: '#fff',
                      pathColor: '#1eb46b',
                      trailColor: '#163526',
                    })}
                  />
                </div>
                <div className="ml-2 mt-4">
                  <span className="text-xs text-white font-semibold block">User</span>
                  <span className="text-xs text-white font-semibold block">Score</span>
                </div>
                <div className="ml-4 mt-4 flex align-center justify-center">
                  <IoListCircle size="30px" color="gray" className="bg-[#172b4d] rounded-full mx-1" />
                  <BiSolidHeartCircle size="30px" color="gray" className="bg-[#172b4d] rounded-full mx-1" />
                  <MdFlagCircle size="30px" color="gray" className="bg-[#172b4d] rounded-full mx-1" />
                  <MdStars size="30px" color="gray" className="bg-[#172b4d] rounded-full mx-1" />
                  <BiSolidChevronRight size="20px" className="ml-1 mt-1" />
                  <span className="text-sm mt-0.5">Play Trailer</span>
                </div>
              </div>
              <div className="mt-4 text-gray-300 text-sm">{movie.tagline}</div>
              <div className="text-white text-lg font-semibold mt-2">Overview</div>
              <div className="mt-2 text-gray-300 text-sm ">{movie.overview}</div>
              <div className='flex itens-center'>
                <div>
                  <div className='mt-4 font-semibold text-sm'>{directors.join(', ')}</div>
                  <div className='text-gray-300 text-sm'>Director, Writer</div>
                </div>
                {firstCharacter && (
                  <div className="character-container mt-4 ml-48">
                    <div>
                      <div className="font-semibold text-sm">{firstCharacter.name}</div>
                      <div className="text-gray-300 text-sm">Characteres</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex'>
        <div>
          <div className="mt-4 ml-12 font-semibold">Top Billed Cast</div>
          <div className="flex overflow-x-auto mt-2 w-[900px] ml-10 mb-4">
            {characters.map((character) => (
              <div key={character.id} className="character-container flex-shrink-0 mx-2">
                {character.profilePath && character.profilePath !== 'null' ? (
                  <img
                    src={api_image + character.profilePath}
                    alt={character.name}
                    className="w-20 h-24 mx-auto"
                  />
                ) : (
                  <div className="w-20 h-24 text-center mx-auto bg-gray-300 flex items-center justify-center">
                    No<br />Image
                  </div>
                )}
                <div className="mt-2 text-xs text-gray-600 text-center">{character.name}</div>
                <div className="text-[8px] text-center text-gray-600">{character.characterName}</div>
              </div>
            ))}
          </div>
        </div>
        <div className='ml-2'>
          <div className="flex space-x- mt-4 gap-x-2">
            {SocialIcons.map((item) => (
              <div key={item.key}>{item.icon}</div>
            ))}
          </div>
          <div className='text-xs mt-4'>
            <span className='font-semibold'>Status</span><br />
            {movie.status}
          </div>
          <div className='text-xs mt-6'>
            <span className='font-semibold'>Original Language</span><br />
            {movie.original_language.toUpperCase()}
          </div>
        </div>
      </div>

    </div>
  );
};

export default MoviePage;