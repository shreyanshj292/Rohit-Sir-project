import Title from './Title';

const TitleList = ({ name, titles, toggle, watchList }) => {
  return (
    <div className="titleList">
      <div className="title">
        <h1>{name}</h1>
        <div className="titles-wrapper">
          {titles.map((title) => {
            const onWatchList =
              watchList.findIndex((item) => item === title) === -1
                ? false
                : true;
            return (
              <Title
                key={title.id}
                title={title}
                toggle={toggle}
                onWatchList={onWatchList}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TitleList;
