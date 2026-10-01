import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MessageSquare,
  Send,
  Heart,
  Smile,
  ThumbsUp,
  Sparkles,
  Award
} from 'lucide-react';

interface Props {
  targetId: string;
  reactions?: { [emoji: string]: number };
}

export const CommentsReactionSection: React.FC<Props> = ({ targetId, reactions = {} }) => {
  const {
    comments,
    addComment,
    toggleReactionOnPost,
    toggleReactionOnComment,
    currentUser,
    t
  } = useApp();

  const [commentText, setCommentText] = useState('');
  const [showInput, setShowInput] = useState(false);

  const postComments = comments.filter(c => c.targetId === targetId);

  const availableEmojis = ['❤️', '🤲', '👏', '👍', '💡'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    addComment(targetId, commentText.trim());
    setCommentText('');
  };

  return (
    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3 text-xs">
      {/* Emoji Reactions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] text-slate-400 font-medium">রিঅ্যাক্ট:</span>
          {availableEmojis.map((emoji) => {
            const count = reactions[emoji] || 0;
            return (
              <button
                key={emoji}
                type="button"
                onClick={() => toggleReactionOnPost(targetId, emoji)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all text-xs active:scale-95"
              >
                <span>{emoji}</span>
                {count > 0 && <span className="font-bold text-[10px] text-slate-600 dark:text-slate-300">{count}</span>}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setShowInput(prev => !prev)}
          className="flex items-center gap-1 text-slate-500 hover:text-emerald-600 font-semibold"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>{postComments.length}টি মন্তব্য</span>
        </button>
      </div>

      {/* Comment Input */}
      {showInput && (
        <form onSubmit={handleSubmit} className="flex gap-2 pt-2">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder={currentUser ? `${currentUser.name} হিসেবে মন্তব্য লিখুন...` : 'আপনার মতামত বা শুভকামনা লিখুন...'}
            className="flex-1 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs"
          />
          <button
            type="submit"
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold flex items-center gap-1"
          >
            <Send className="w-3 h-3" />
            <span>মন্তব্য</span>
          </button>
        </form>
      )}

      {/* Comments List */}
      {postComments.length > 0 && (
        <div className="space-y-2 pt-2">
          {postComments.map((comment) => (
            <div
              key={comment.id}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={comment.authorAvatar}
                    alt={comment.authorName}
                    className="w-5 h-5 rounded-full object-cover border"
                  />
                  <span className="font-bold text-slate-900 dark:text-white text-[11px]">
                    {comment.authorName}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-medium bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.2 rounded">
                    {comment.authorRole}
                  </span>
                </div>

                {/* Reaction on Comment */}
                <div className="flex items-center gap-1">
                  {Object.entries(comment.reactions || {}).map(([em, cnt]) => (
                    <button
                      key={em}
                      onClick={() => toggleReactionOnComment(comment.id, em)}
                      className="text-[10px] text-slate-500 hover:scale-110 transition-transform"
                    >
                      {em} {cnt}
                    </button>
                  ))}
                  <button
                    onClick={() => toggleReactionOnComment(comment.id, '❤️')}
                    className="text-slate-400 hover:text-red-500 text-[10px]"
                    title="লাইক"
                  >
                    ❤️
                  </button>
                </div>
              </div>

              <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed pl-7">
                {comment.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
