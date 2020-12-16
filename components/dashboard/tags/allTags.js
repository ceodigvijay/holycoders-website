import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { getAllAdminTags } from "../../../lib/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GlobalContext from "../../../contexts/globalContext";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import ListView from "../listView";
export default function allTags() {
  const router = useRouter();
  const page = router.query.page ? router.query.page : 1;
  const [tagData, setTagData] = useState({
    tags: [],
    meta: {},
  });
  const { addNotification } = useContext(GlobalContext);
  useEffect(() => {
    const getData = async () => {
      let data;
      try {
        const res = await getAllAdminTags(page, 10);
        data = res.data;
      } catch (error) {
        addNotification({
          message: "Some error in fetching the tags. Please contact us.",
          type: "error",
        });
      }
      if (data) {
        setTagData(data);
      }
    };
    getData();
  }, [page]);
  return (
    <div>
      <ListView data={tagData} isTagPage={true} />
    </div>
  );
}
