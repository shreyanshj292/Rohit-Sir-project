import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import placeholder from '../assets/image-not-available.jpg';

const Title = ({ title, toggle, onWatchList }) => {
  const { id, name, poster_path, vote_average, overview } = title;

  const poster = poster_path
    ? `https://image.tmdb.org/t/p/w500/${poster_path}`
    : placeholder;

  return (
    <div className="movie">
      <Link to={`/details/${id}`}>
        <img src={poster} alt="Movie poster" />
        <div className="overlay">
          <div className="title">{name}</div>
          <div className="rating">{vote_average}/10</div>
          <div className="plot">{overview}</div>
        </div>
      </Link>
      <div
        onClick={() => toggle(title)}
        data-toggled={onWatchList}
        className="listToggle"
      >
        <div>
          <FontAwesomeIcon icon={faPlus} className="fa fa-fw fa-plus" />
          <FontAwesomeIcon icon={faCheck} className="fa fa-fw fa-check" />
        </div>
      </div>
    </div>
  );
};

export default Title;
