import { useState, useEffect, useRef } from "react";
import axios from "axios";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { useParams } from "react-router-dom";
import { LuSend } from "react-icons/lu";

var stompClient = null;

export default function ChatRoom() {
    const [userData, setUserData] = useState({
        userId: null,
        groupId: null,
        firstName: "",
        lastName: "",
        email: "",
        connected: false,
        message: "",
    });

    const { id } = useParams();
    const [publicChat, setPublicChat] = useState([]);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/user/UserChatInfo/${id}`
                );
                setUserData((prev) => ({
                    ...prev,
                    ...response.data,
                    username: `${response.data.firstName} ${response.data.lastName}`,
                }));
            } catch (error) {
                console.error("Erreur lors de la récupération des données:", error);
            }
        };

        if (id) fetchUserData();
    }, [id]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/chat/getMessageGroup/${userData.groupId}`
                );
                const formattedMessages = response.data.map((msg) => ({
                    senderId: msg.sender.id,
                    senderName: `${msg.sender.firstName} ${msg.sender.lastName}`,
                    message: msg.content,
                    time: new Date(msg.date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
                    status: "MESSAGE",
                }));
                setPublicChat(formattedMessages);
            } catch (error) {
                console.error("Erreur lors de la récupération des messages:", error);
            }
        };

        if (userData.groupId) {
            fetchMessages();
        }
    }, [userData.groupId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [publicChat]);

    const handleValue = (event) => {
        const { value, name } = event.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const registerUser = () => {
        let sock = new SockJS("http://localhost:8080/ws");
        stompClient = over(sock);
        stompClient.connect({}, onConnected, onError);
    };

    const onConnected = () => {
        setUserData((prev) => ({ ...prev, connected: true }));
        stompClient.subscribe(`/chatroom/${userData.groupId}`, onMessageReceived);
        userJoin();
    };

    const onMessageReceived = (payload) => {
        let payloadData = JSON.parse(payload.body);
        payloadData.time = new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
        setPublicChat((prev) => [...prev, payloadData]);
    };

    const onError = (err) => {
        console.log(err);
    };

    const sendMessage = () => {
        if (stompClient && userData.message.trim()) {
            let chatMessage = {
                senderId: userData.userId,
                senderName: userData.username,
                groupId: userData.groupId,
                message: userData.message,
                status: "MESSAGE",
            };

            stompClient.send(
                `/app/message/${userData.groupId}`,
                {},
                JSON.stringify(chatMessage)
            );

            axios.post("http://localhost:8080/chat/save", {
                content: userData.message,
                date: new Date().toISOString(),
                senderId: userData.userId,
                groupId: userData.groupId,
            })
                .catch((error) => {
                    console.error("Erreur lors de la sauvegarde du message:", error);
                });

            setUserData((prev) => ({ ...prev, message: "" }));
        }
    };

    const userJoin = () => {
        if (stompClient) {
            let chatMessage = {
                senderId: userData.userId,
                senderName: userData.username,
                groupId: userData.groupId,
                message: `a rejoint`,
                // le groupe ${userData.groupId}
                status: "JOIN",
            };
            stompClient.send(
                `/app/message/${userData.groupId}`,
                {},
                JSON.stringify(chatMessage)
            );
        }
    };

    return (
        <div className="w-full min-h-full flex flex-col border border-gray-400 rounded-lg p-4 shadow-lg bg-white">
            {userData.connected ? (
                <>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 border border-gray-300 rounded-lg">
                        {publicChat.map((chat, index) => (
                            <div key={index} className="flex items-start space-x-3">
                                <img
                                    src={`https://robohash.org/${chat.senderId}.png?size=100x100`}
                                    alt="avatar"
                                    className="w-10 h-10 rounded-full"
                                />
                                <div className={`p-3 rounded-lg max-w-xs shadow-md text-left ${
                                    chat.status === "JOIN"
                                        ? "bg-gray-200 text-gray-600 w-full text-center"
                                        : "bg-blue-100"
                                }`}>
                                    {chat.status === "JOIN" ? (
                                        <p className="text-sm font-semibold text-center">{chat.senderName} {chat.message}</p>
                                    ) : (
                                        <>
                                            <p className="text-sm font-semibold">{chat.senderName}</p>
                                            <p className="text-sm text-left">{chat.message}</p>
                                            <p className="text-xs text-right opacity-70 mt-1">{chat.time}</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="flex items-center w-full p-3 bg-gray-100 shadow-md rounded-t-lg">
                        <textarea
                            className="p-2 w-full outline-none text-gray-700 border bg-white rounded-lg shadow-sm resize-none h-16"
                            name="message"
                            placeholder="Votre message"
                            value={userData.message}
                            onChange={handleValue}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    sendMessage();
                                }
                            }}
                        />
                        <button
                            onClick={sendMessage}
                            className="ml-3 p-2 bg-gradient-to-br from-blue-700 to-purple-700 text-white rounded-md shadow-md hover:bg-blue-700 transition"
                        >
                            <LuSend className="h-5 w-5 text-white" />
                        </button>
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <h2 className="text-2xl mb-4">Bienvenue {userData.username}</h2>
                    <button
                        onClick={registerUser}
                        className="bg-gradient-to-br from-blue-700 to-purple-700 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
                    >
                        Rejoindre le groupe
                        {/*{userData.groupId}*/}
                    </button>
                </div>
            )}
        </div>
    );
}