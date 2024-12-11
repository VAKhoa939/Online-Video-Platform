import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { getVideos, Video } from "../interfaces/video";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { useQuery } from "@tanstack/react-query";
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
    console.log(term);
  }

  function getKeywords(videoList: Video[]) {
    const newKeywords: string[] = [];
    videoList.forEach((video) => {
      newKeywords.push(video.title);
      video.keywords.forEach((keyword) => newKeywords.push(keyword));
    });
    return newKeywords;
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
        <div className="dropdown-menu">
          {keywords
            .filter((keyword) => {
              const currSearchTerm = value.toLowerCase();
              const keywordLower = keyword.toLowerCase();
              return (
                currSearchTerm &&
                keywordLower.includes(currSearchTerm) &&
                keywordLower !== currSearchTerm
              );
            })
            .map((keyword, index) => (
              <div
                className="dropdown-row"
                key={index}
                onClick={() => setValue(keyword)}
              >
                {keyword}
              </div>
            ))}
        </div>
      </div>
      <button className="search-button" onClick={() => onSearch(value)}>
        <FaSearch size={size} />
        <div className="tooltip">Search</div>
      </button>
    </>
  );
};

export default SearchBar;
