import React from "react";
import { useState, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const ScrollableContainer = styled(Box)`
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px;
  background-color: var(--figma-color-bg);
  border: 1px solid var(--figma-color-border);
  border-radius: 4px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  
  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--figma-color-bg-secondary);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--figma-color-border);
    border-radius: 4px;
    
    &:hover {
      background: var(--figma-color-border-strong);
    }
  }
`;

const LogEntry = styled(Box)`
  padding: 4px 8px;
  margin-bottom: 4px;
  font-family: monospace;
  font-size: 11px;
  line-height: 16px;
  color: var(--figma-color-text);
  word-break: break-word;
  white-space: pre-wrap;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export type LogsProps = {
  logs?: string[];
  onAddLogRef?: React.MutableRefObject<((log: string) => void) | null>;
};

export default function Logs(props: LogsProps) {
  const [logs, setLogs] = useState<string[]>(props.logs || []);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const prevLogsLengthRef = useRef<number>(0);

  // Update logs when props.logs changes (controlled mode)
  useEffect(() => {
    if (props.logs !== undefined) {
      setLogs(props.logs);
    }
  }, [props.logs]);

  // Auto-scroll to bottom when new logs are added
  useEffect(() => {
    if (scrollContainerRef.current && logs.length > prevLogsLengthRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
    prevLogsLengthRef.current = logs.length;
  }, [logs]);

  // Expose addLog function to parent via ref (uncontrolled mode)
  useEffect(() => {
    if (props.onAddLogRef) {
      props.onAddLogRef.current = (log: string) => {
        setLogs((prevLogs) => [...prevLogs, log]);
      };
    }
    return () => {
      if (props.onAddLogRef) {
        props.onAddLogRef.current = null;
      }
    };
  }, [props.onAddLogRef]);

  return (
    <ScrollableContainer ref={scrollContainerRef}>
      {logs.length === 0 ? (
        <Typography
          variant="body2"
          sx={{
            color: "var(--figma-color-text-secondary)",
            fontStyle: "italic",
            textAlign: "center",
            padding: "16px",
          }}
        >
          No logs yet
        </Typography>
      ) : (
        logs.map((log, index) => (
          <LogEntry key={index}>{log}</LogEntry>
        ))
      )}
    </ScrollableContainer>
  );
}
