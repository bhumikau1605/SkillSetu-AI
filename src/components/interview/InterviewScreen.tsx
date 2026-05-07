"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { INTERVIEW_QUESTIONS } from "@/lib/mockData";
import { Language } from "@/lib/types";
import { Mic, MicOff, Video, Brain, ChevronRight, Clock } from "lucide-react";

interface Props {
  language: Language;
  candidateName: string;
  onComplete: (transcript: string) => void;
}

const SAMPLE_TRANSCRIPTS_BY_LANG = {
  english: [
    "I have been working in construction for over 8 years. I started as a helper and gradually learned masonry and plastering.",
    "My main skill is electrical wiring. I completed my ITI diploma and have experience in domestic and industrial work.",
    "Yes, I have worked with heavy machinery including excavators and concrete mixers on large projects.",
    "I once managed a team of 12 workers during a tight deadline project and we delivered it on time.",
    "I am hardworking, reliable, and always willing to learn new skills to improve my work quality.",
  ],
  hindi: [
    "मैं 8 साल से निर्माण कार्य में हूं। मैंने राजमिस्त्री और प्लास्टरिंग सीखी है।",
    "मेरा मुख्य कौशल बिजली का काम है। मैंने ITI डिप्लोमा किया है।",
    "हां, मैंने भारी मशीनरी के साथ काम किया है।",
    "मैंने एक बड़े प्रोजेक्ट में 12 कर्मचारियों की टीम का नेतृत्व किया।",
    "मैं मेहनती और विश्वसनीय हूं।",
  ],
  kannada: [
    "ನಾನು 8 ವರ್ಷಗಳಿಂದ ನಿರ್ಮಾಣ ಕ್ಷೇತ್ರದಲ್ಲಿ ಕೆಲಸ ಮಾಡುತ್ತಿದ್ದೇನೆ.",
    "ನನ್ನ ಮುಖ್ಯ ಕೌಶಲ್ಯ ವಿದ್ಯುತ್ ವೈರಿಂಗ್. ನಾನು ITI ಡಿಪ್ಲೋಮಾ ಮಾಡಿದ್ದೇನೆ.",
    "ಹೌದು, ನಾನು ಭಾರೀ ಯಂತ್ರಗಳೊಂದಿಗೆ ಕೆಲಸ ಮಾಡಿದ್ದೇನೆ.",
    "ನಾನು 12 ಕಾರ್ಮಿಕರ ತಂಡವನ್ನು ನಿರ್ವಹಿಸಿದ್ದೇನೆ.",
    "ನಾನು ಶ್ರಮಶೀಲ ಮತ್ತು ವಿಶ್ವಾಸಾರ್ಹ ವ್ಯಕ್ತಿ.",
  ],
};

function WaveformAnimation({ active }: { active: boolean }) {
  return (
    <div className="flex items-center gap-0.5 h-8">
      {Array.from({ length: 7 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-blue-400 rounded-full"
          animate={
            active
              ? { scaleY: [0.3, 1, 0.3], height: ["8px", "28px", "8px"] }
              : { height: "4px" }
          }
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
          style={{ height: "4px" }}
        />
      ))}
    </div>
  );
}

export function InterviewScreen({ language, candidateName, onComplete }: Props) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [transcript, setTranscript] = useState<string[]>([]);
  const [showTranscript, setShowTranscript] = useState(false);
  const [processing, setProcessing] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();

  const questions = INTERVIEW_QUESTIONS[language];
  const transcripts = SAMPLE_TRANSCRIPTS_BY_LANG[language];

  const handleStopRecording = useCallback(() => {
    setIsRecording(false);
    setTranscript((prev) => {
      const updated = [...prev];
      updated[questionIndex] = transcripts[questionIndex % transcripts.length];
      return updated;
    });
  }, [questionIndex, transcripts]);

  useEffect(() => {
    if (isRecording && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0 && isRecording) {
      handleStopRecording();
    }
    return () => clearTimeout(timerRef.current);
  }, [isRecording, timeLeft, handleStopRecording]);

  const handleStartRecording = () => {
    setIsRecording(true);
    setTimeLeft(30);
    setShowTranscript(false);
    setTimeout(() => setShowTranscript(true), 2000);
  };

  const handleNext = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((i) => i + 1);
      setIsRecording(false);
      setTimeLeft(30);
      setShowTranscript(false);
    } else {
      setProcessing(true);
      setTimeout(() => onComplete(transcript.join(" ")), 2500);
    }
  };

  const progress = ((questionIndex + 1) / questions.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-[var(--muted-foreground)] mb-2">
          <span>Question {questionIndex + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="h-1.5 bg-[var(--muted)] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Webcam + AI Panel */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="overflow-hidden">
            <div className="relative bg-slate-900 aspect-video flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
              <div className="relative text-center">
                <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center mx-auto mb-2">
                  <Video className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-400 text-xs">{candidateName}</p>
              </div>
              {isRecording && (
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-red-500"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <span className="text-xs text-red-400 font-medium">REC</span>
                </div>
              )}
              {isRecording && (
                <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/50 rounded-full px-3 py-1">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span className="text-xs text-amber-400 font-mono">{timeLeft}s</span>
                </div>
              )}
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--foreground)]">AI Interviewer</p>
                <div className="flex items-center gap-1.5">
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-xs text-emerald-400">
                    {isRecording ? "AI is listening..." : "Ready"}
                  </span>
                </div>
              </div>
            </div>
            <WaveformAnimation active={isRecording} />
          </Card>
        </div>

        {/* Question + Controls */}
        <div className="lg:col-span-3 space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={questionIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="info">Q{questionIndex + 1}</Badge>
                  <span className="text-xs text-[var(--muted-foreground)] capitalize">{language}</span>
                </div>
                <p className="text-lg font-medium text-[var(--foreground)] leading-relaxed">
                  {questions[questionIndex]}
                </p>
              </Card>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence>
            {showTranscript && isRecording && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Mic className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-xs text-blue-400 font-medium">Live Transcript</span>
                  </div>
                  <motion.p
                    className="text-sm text-[var(--muted-foreground)] leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {transcripts[questionIndex % transcripts.length]}
                    <motion.span
                      className="inline-block w-0.5 h-4 bg-blue-400 ml-1 align-middle"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                  </motion.p>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {transcript.length > 0 && (
            <Card className="p-4">
              <p className="text-xs text-[var(--muted-foreground)] mb-2 font-medium">
                Recorded Answers ({transcript.filter(Boolean).length})
              </p>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {transcript.filter(Boolean).map((t, i) => (
                  <div key={i} className="text-xs text-[var(--muted-foreground)] bg-[var(--muted)] rounded p-2">
                    <span className="text-blue-400 font-medium">Q{i + 1}: </span>{t.slice(0, 80)}...
                  </div>
                ))}
              </div>
            </Card>
          )}

          <div className="flex gap-3">
            {!isRecording ? (
              <Button
                className="flex-1"
                size="lg"
                onClick={handleStartRecording}
                disabled={processing}
              >
                <Mic className="w-4 h-4" />
                {transcript[questionIndex] ? "Re-record" : "Start Recording"}
              </Button>
            ) : (
              <Button
                className="flex-1"
                size="lg"
                variant="danger"
                onClick={handleStopRecording}
              >
                <MicOff className="w-4 h-4" />
                Stop Recording
              </Button>
            )}
            <Button
              size="lg"
              variant="outline"
              onClick={handleNext}
              disabled={!transcript[questionIndex] || isRecording || processing}
              loading={processing}
            >
              {questionIndex < questions.length - 1 ? (
                <>Next <ChevronRight className="w-4 h-4" /></>
              ) : (
                "Finish"
              )}
            </Button>
          </div>

          {processing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-4"
            >
              <div className="flex items-center justify-center gap-2 text-blue-400">
                <Brain className="w-4 h-4 animate-pulse" />
                <span className="text-sm">AI is analyzing your responses...</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
