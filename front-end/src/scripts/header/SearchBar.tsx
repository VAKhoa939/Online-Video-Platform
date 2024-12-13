import { ReactNode, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { getVideos, Video } from "../interfaces/video";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { useQuery } from "react-query";
import { defaultUser } from "../interfaces/user";
import { setSearchTerm } from "../state/uiSlice";

interface Props {
  size: number;
}

const SearchBar = ({ size }: Props) => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const videoMode = useSelector((state: RootState) => state.ui.videoMode);

  const { data: videos = [] } = useQuery({
    queryKey: ["video", videoMode, defaultUser],
    queryFn: async () => getVideos(videoMode, defaultUser),
  });
  const keywords = getKeywords(videos);

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function onSearch(term: string) {
    dispatch(setSearchTerm(term));
  }

  function getKeywords(videos: Video[]) {
    const newKeywords: string[] = [];
    videos.forEach((video) => {
      newKeywords.push(video.title);
      video.keywords.forEach((keyword) => newKeywords.push(keyword));
    });
    return newKeywords;
  }

  function filterKeywords(): ReactNode {
    const currSearchTerm = value.toLowerCase();

    let isChosen = false;
    const filteredKeywords = keywords.filter((keyword) => {
      const keywordLower = keyword.toLowerCase();
      if (!isChosen && currSearchTerm === keywordLower) isChosen = true;
      return (
        currSearchTerm &&
        keywordLower.includes(currSearchTerm) &&
        keywordLower !== currSearchTerm
      );
    });

    if (currSearchTerm && !isChosen && !filteredKeywords.length)
      return (
        <div className="dropdown-row" key={0}>
          No keyword found
        </div>
      );

    return filteredKeywords.map((keyword, index) => (
      <div
        className="dropdown-row"
        key={index}
        onClick={() => {
          setValue(keyword);
        }}
      >
        {keyword}
      </div>
    ));
  }

  return (
    <>
      <div className="dropdown">
        <div className="search-bar-container">
          <input
            className="search-bar"
            type="text"
            placeholder="Search"
            value={value}
            onChange={onChange}
            onKeyDown={(e) => e.key === "Enter" && onSearch(value)}
          />
        </div>
        <div className="dropdown-menu">{filterKeywords()}</div>
      </div>
      <button className="search-button" onClick={() => onSearch(value)}>
        <FaSearch size={size} />
        <div className="tooltip">Search</div>
      </button>
    </>
  );
};

export default SearchBar;
