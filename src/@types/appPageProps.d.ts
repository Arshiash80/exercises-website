import { Dispatch, SetStateAction, useEffect } from "react";
type AppPageProps = {
    /** Update the `title` tag inside the `head` tag */
    setHeadTitle: Dispatch<SetStateAction<string>>;
    /** Update the `description` meta tag inside the `head` tag */
    setHeadDescripion: Dispatch<SetStateAction<string>>;
}