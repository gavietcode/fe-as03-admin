import React, { useEffect, useState } from "react";
import { getUser } from "../../api/ChatRequest";
import { FcManager } from "react-icons/fc";

const Conversation = ({ data, currentUserId }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUserId);
    // console.log(userId, "userId");
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log("Error in getting User Data", error);
      }
    };
    getUserData();
  }, []);

  return (
    <>
      <div className="follower conversation">
        <div>
          <div className="omline-dot"></div>
          <FcManager size={50} />
          <div className="name" style={{ fontSize: "0.8rem" }}>
            <span>User</span>
            <span> Online</span>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default Conversation;
