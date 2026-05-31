import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function EmailManagement() {
  const [selectedTab, setSelectedTab] = useState("received");
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [newContent, setNewContent] = useState("");

  const [receivedEmails, setReceivedEmails] = useState([]);
  const [sentEmails, setSentEmails] = useState([]);
  const [members, setMembers] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Emails reçus
        const receivedResponse = await axios.get(`http://localhost:8080/inbox/receive/${id}`);
        setReceivedEmails(receivedResponse.data.map(email => ({
          id: email.inboxId,
          sender: email.senderName,
          senderId: email.senderId,
          subject: email.subject,
          content: email.content
        })));

        // Emails envoyés
        const sentResponse = await axios.get(`http://localhost:8080/inbox/send/${id}`);
        setSentEmails(sentResponse.data.map(email => ({
          id: email.inboxId,
          recipient: email.receiverName,
          recipientId: email.receiverId,
          subject: email.subject,
          content: email.content
        })));

        // Membres et encadrement
        const groupResponse = await axios.get(`http://localhost:8080/user/MembresGroup/${id}`);
        const membres = groupResponse.data.MembresGroup || [];
        const encadrement = groupResponse.data.Encadrement ? [groupResponse.data.Encadrement] : [];
        const allMembers = [...membres, ...encadrement];


        setMembers(allMembers.map(member => ({
          id: member.id,
          // name: member.firstName
          //     ? `${member.firstName} ${member.lastName}`
          //     : member.email
          name: `${member.firstName} ${member.lastName}`

        })));
      } catch (error) {
        console.error("Erreur de chargement des données:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleSendEmail = async () => {
    if (!replyContent.trim()) return;

    try {
      await axios.post("http://localhost:8080/inbox/add", {
        subject: `${selectedEmail.subject}`,
        content: replyContent,
        receiverId: selectedEmail.senderId,
        senderId: id
      });

      const sentResponse = await axios.get(`http://localhost:8080/inbox/send/${id}`);
      setSentEmails(sentResponse.data.map(email => ({
        id: email.inboxId,
        recipient: email.receiverName,
        recipientId: email.receiverId,
        subject: email.subject,
        content: email.content
      })));

      setReplyContent("");
      setIsReplying(false);
    } catch (error) {
      console.error("Erreur lors de l'envoi de la réponse:", error);
    }
  };

  const handleSendNewEmail = async () => {
    if (!newContent.trim() || !selectedMember) return;

    try {
      await axios.post("http://localhost:8080/inbox/add", {
        subject: newSubject,
        content: newContent,
        receiverId: selectedMember.id,
        senderId: id
      });

      const sentResponse = await axios.get(`http://localhost:8080/inbox/send/${id}`);
      setSentEmails(sentResponse.data.map(email => ({
        id: email.inboxId,
        recipient: email.receiverName,
        recipientId: email.receiverId,
        subject: email.subject,
        content: email.content
      })));

      setNewSubject("");
      setNewContent("");
      setSelectedMember(null);
    } catch (error) {
      console.error("Erreur lors de l'envoi du nouvel email:", error);
    }
  };

  const truncateText = (text, maxLength = 20) =>
      text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  return (
      <div className="min-h-screen bg-gray-50 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Gestion des Emails</h1>
          <p className="text-gray-600 mt-2">Gérez votre communication avec le groupe</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 border-b border-gray-200 mb-6">
          {["received", "sent", "new"].map((tab) => (
              <button
                  key={tab}
                  onClick={() => {
                    setSelectedTab(tab);
                    setIsReplying(false);
                    setSelectedEmail(null);
                    setSelectedMember(null);
                  }}
                  className={`px-6 py-3 text-sm font-medium rounded-t-lg transition-colors duration-200
              ${
                      selectedTab === tab
                          ? "bg-white border border-b-0 border-gray-200 text-blue-600"
                          : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  }`}
              >
                {tab === "received" && "Emails Reçus"}
                {tab === "sent" && "Emails Envoyés"}
                {tab === "new" && "Nouvel Email"}
              </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Sidebar */}
          <div className="w-1/3 border-r border-gray-200">
            {selectedTab === "received" && (
                <ul>
                  {receivedEmails.map((email) => (
                      <li
                          key={email.id}
                          onClick={() => {
                            setSelectedEmail(email);
                            setIsReplying(false);
                            setSelectedMember(null);
                          }}
                          className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200
                    ${
                              selectedEmail?.id === email.id
                                  ? "bg-blue-50 border-l-4 border-blue-600"
                                  : "border-l-4 border-transparent"
                          }`}
                      >
                        <div className="flex items-center space-x-3">
                          <img
                              src={`https://robohash.org/${email.senderId}.png?size=100x100`}
                              alt="avatar"
                              className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{email.sender}</p>
                            <p className="text-sm text-gray-500 truncate">{truncateText(email.subject)}</p>
                          </div>
                        </div>
                      </li>
                  ))}
                </ul>
            )}

            {selectedTab === "sent" && (
                <ul>
                  {sentEmails.map((email) => (
                      <li
                          key={email.id}
                          onClick={() => {
                            setSelectedEmail(email);
                            setIsReplying(false);
                            setSelectedMember(null);
                          }}
                          className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200
                    ${
                              selectedEmail?.id === email.id
                                  ? "bg-blue-50 border-l-4 border-blue-600"
                                  : "border-l-4 border-transparent"
                          }`}
                      >
                        <div className="flex items-center space-x-3">
                          <img
                              src={`https://robohash.org/${email.recipientId}.png?size=100x100`}
                              alt="avatar"
                              className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{email.recipient}</p>
                            <p className="text-sm text-gray-500 truncate">{truncateText(email.subject)}</p>
                          </div>
                        </div>
                      </li>
                  ))}
                </ul>
            )}

            {selectedTab === "new" && (
                <ul>
                  {members.map((member) => (
                      <li
                          key={member.id}
                          onClick={() => setSelectedMember(member)}
                          className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200
                    ${
                              selectedMember?.id === member.id
                                  ? "bg-blue-50 border-l-4 border-blue-600"
                                  : "border-l-4 border-transparent"
                          }`}
                      >
                        <div className="flex items-center space-x-3">
                          <img
                              // member.id > 14 ? Math.random(1, 13) :
                              src={`https://robohash.org/${ member.id}.png?size=100x100`}
                              alt="avatar"
                              className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{member.name} </p>
                          </div>
                        </div>
                      </li>
                  ))}
                </ul>
            )}
          </div>

          {/* Email Content */}
          <div className="w-2/3 p-6">
            {selectedTab === "received" || selectedTab === "sent" ? (
                selectedEmail ? (
                    isReplying ? (
                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sujet</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={`${selectedEmail.subject}`}
                                readOnly
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Message précédent
                            </label>
                            <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
                              {selectedEmail.content}
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Votre réponse
                            </label>
                            <textarea
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
                                placeholder="Écrivez votre réponse ici..."
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                            />
                          </div>

                          <button
                              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                              onClick={handleSendEmail}
                          >
                            Envoyer
                          </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sujet</label>
                            <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
                              {selectedEmail.subject}
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                            <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-600 whitespace-pre-wrap">
                              {selectedEmail.content}
                            </div>
                          </div>

                          {selectedTab === "received" && (
                              <button
                                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                  onClick={() => setIsReplying(true)}
                              >
                                Répondre
                              </button>
                          )}
                        </div>
                    )
                ) : (
                    <div className="text-center text-gray-500 py-20">
                      <p>Sélectionnez un email pour l'afficher</p>
                    </div>
                )
            ) : selectedTab === "new" ? (
                selectedMember ? (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">À</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={selectedMember.name}
                            readOnly
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Sujet</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={newSubject}
                            onChange={(e) => setNewSubject(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                        <textarea
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                        />
                      </div>

                      <button
                          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                          onClick={handleSendNewEmail}
                      >
                        Envoyer
                      </button>
                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-20">
                      <p>Sélectionnez un membre pour envoyer un email</p>
                    </div>
                )
            ) : null}
          </div>
        </div>
      </div>
  );
}