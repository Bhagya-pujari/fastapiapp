import os



def get_history(session_id:str)->ChatMessageHistory:
    if session_id not in store:
        store[session_id]=ChatMessageHistory()
    return store[session_id]
chat_with_memory=RunnableWithMessageHistory(
    runnable=chat_with_memory,
    get_session_history=get_history,
    input_message_key="user_query",
    history_messages_key="chat_history"
)
def ask_career_chatbot_response(question:str,session_id:str="default")->str:
    response=chat_with_memory.invoke({"user_query":question},{"configurable": {"session_id": session_id}})
    return response.content