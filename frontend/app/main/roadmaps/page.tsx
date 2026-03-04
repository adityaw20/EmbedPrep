'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Map, 
  CheckCircle, 
  Circle, 
  Clock, 
  Target, 
  Award,
  ChevronRight,
  BookOpen,
  Code,
  Cpu,
  Wifi,
  Zap,
  Play
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUserProgress } from '@/lib/hooks';

interface RoadmapStage {
  id: string;
  title: string;
  description: string;
  topics: string[];
  questionCount: number;
  estimatedHours: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  stages: RoadmapStage[];
  totalQuestions: number;
  totalHours: number;
}

const learningPaths: LearningPath[] = [
  {
    id: 'fresher',
    title: 'Fresh Graduate Path',
    description: 'Perfect for recent graduates preparing for their first embedded systems role.',
    icon: <BookOpen className="w-6 h-6" />,
    color: '#3b82f6',
    totalQuestions: 50,
    totalHours: 40,
    stages: [
      {
        id: 'fresher-1',
        title: 'C Programming Fundamentals',
        description: 'Master the basics of C programming - the foundation of embedded systems.',
        topics: ['Variables & Data Types', 'Control Flow', 'Functions', 'Arrays & Strings', 'Pointers Basics'],
        questionCount: 15,
        estimatedHours: 8,
        difficulty: 'beginner'
      },
      {
        id: 'fresher-2',
        title: 'Basic Embedded Concepts',
        description: 'Learn fundamental embedded systems concepts.',
        topics: ['GPIO', 'Timers', 'Interrupts', 'Memory Types', 'Basic Protocols'],
        questionCount: 12,
        estimatedHours: 10,
        difficulty: 'beginner'
      },
      {
        id: 'fresher-3',
        title: 'Communication Protocols',
        description: 'Understanding basic communication protocols.',
        topics: ['UART', 'I2C Basics', 'SPI Basics', 'Protocol Comparison'],
        questionCount: 10,
        estimatedHours: 8,
        difficulty: 'beginner'
      },
      {
        id: 'fresher-4',
        title: 'Interview Preparation',
        description: 'Common interview questions for freshers.',
        topics: ['Resume Projects', 'Common Questions', 'Puzzle Solving', 'Aptitude'],
        questionCount: 13,
        estimatedHours: 14,
        difficulty: 'beginner'
      }
    ]
  },
  {
    id: 'experienced',
    title: 'Experienced Engineer Path',
    description: 'For engineers with 2-5 years experience looking to level up.',
    icon: <Code className="w-6 h-6" />,
    color: '#8b5cf6',
    totalQuestions: 75,
    totalHours: 60,
    stages: [
      {
        id: 'exp-1',
        title: 'Advanced C/C++',
        description: 'Deep dive into advanced C and C++ concepts.',
        topics: ['Memory Management', 'Data Structures', 'Function Pointers', 'Bit Manipulation', 'C++ OOP', 'Templates'],
        questionCount: 20,
        estimatedHours: 15,
        difficulty: 'intermediate'
      },
      {
        id: 'exp-2',
        title: 'RTOS & Multitasking',
        description: 'Real-time operating systems and task management.',
        topics: ['Task Scheduling', 'Semaphores & Mutexes', 'Deadlocks', 'Priority Inheritance', 'Context Switching'],
        questionCount: 15,
        estimatedHours: 12,
        difficulty: 'intermediate'
      },
      {
        id: 'exp-3',
        title: 'Advanced Protocols',
        description: 'Complex protocols and their implementations.',
        topics: ['CAN Bus', 'USB', 'Ethernet', 'Wireless Protocols', 'Protocol Stacks'],
        questionCount: 20,
        estimatedHours: 18,
        difficulty: 'intermediate'
      },
      {
        id: 'exp-4',
        title: 'System Design',
        description: 'Designing embedded systems and architecture.',
        topics: ['State Machines', 'Error Handling', 'Power Management', 'Bootloaders', 'Debugging'],
        questionCount: 20,
        estimatedHours: 15,
        difficulty: 'advanced'
      }
    ]
  },
  {
    id: 'automotive',
    title: 'Automotive Embedded Path',
    description: 'Specialized path for automotive embedded roles at companies like Bosch, Continental.',
    icon: <Cpu className="w-6 h-6" />,
    color: '#f97316',
    totalQuestions: 60,
    totalHours: 50,
    stages: [
      {
        id: 'auto-1',
        title: 'Automotive Protocols',
        description: 'Essential protocols used in automotive systems.',
        topics: ['CAN', 'LIN', 'FlexRay', 'Automotive Ethernet', 'UDS'],
        questionCount: 20,
        estimatedHours: 15,
        difficulty: 'intermediate'
      },
      {
        id: 'auto-2',
        title: 'Functional Safety (ISO 26262)',
        description: 'Safety standards and ASIL levels.',
        topics: ['ASIL Levels', 'Safety Mechanisms', 'FMEA', 'FTA', 'Redundancy'],
        questionCount: 15,
        estimatedHours: 12,
        difficulty: 'advanced'
      },
      {
        id: 'auto-3',
        title: 'AUTOSAR Basics',
        description: 'Introduction to AUTOSAR architecture.',
        topics: ['AUTOSAR Layers', 'BSW', 'RTE', 'SWC', 'ECU Configuration'],
        questionCount: 15,
        estimatedHours: 13,
        difficulty: 'advanced'
      },
      {
        id: 'auto-4',
        title: 'Automotive Case Studies',
        description: 'Real-world automotive interview scenarios.',
        topics: ['Sensor Interfaces', 'Actuator Control', 'Diagnostic Services', 'Flash Bootloader'],
        questionCount: 10,
        estimatedHours: 10,
        difficulty: 'advanced'
      }
    ]
  },
  {
    id: 'iot',
    title: 'IoT & Connectivity Path',
    description: 'Focus on IoT devices, wireless communication, and cloud connectivity.',
    icon: <Wifi className="w-6 h-6" />,
    color: '#10b981',
    totalQuestions: 55,
    totalHours: 45,
    stages: [
      {
        id: 'iot-1',
        title: 'IoT Fundamentals',
        description: 'Core concepts of Internet of Things.',
        topics: ['IoT Architecture', 'Sensors & Actuators', 'Edge Computing', 'IoT Protocols'],
        questionCount: 15,
        estimatedHours: 10,
        difficulty: 'beginner'
      },
      {
        id: 'iot-2',
        title: 'Wireless Technologies',
        description: 'Wireless communication for IoT.',
        topics: ['WiFi', 'Bluetooth/BLE', 'Zigbee', 'LoRaWAN', 'NB-IoT'],
        questionCount: 15,
        estimatedHours: 12,
        difficulty: 'intermediate'
      },
      {
        id: 'iot-3',
        title: 'IoT Security',
        description: 'Security considerations for connected devices.',
        topics: ['Device Security', 'OTA Updates', 'TLS/SSL', 'Secure Boot', 'Key Management'],
        questionCount: 15,
        estimatedHours: 13,
        difficulty: 'intermediate'
      },
      {
        id: 'iot-4',
        title: 'Cloud Integration',
        description: 'Connecting devices to the cloud.',
        topics: ['MQTT', 'CoAP', 'HTTP/REST', 'AWS IoT', 'Azure IoT'],
        questionCount: 10,
        estimatedHours: 10,
        difficulty: 'intermediate'
      }
    ]
  }
];

export default function RoadmapsPage() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const { progress } = useUserProgress();

  const activePath = learningPaths.find(p => p.id === selectedPath);

  return (
    <div className="min-h-[calc(100vh-4rem)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
            style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
            <Map className="w-8 h-8" style={{ color: 'var(--primary)' }} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>
            Learning Roadmaps
          </h1>
          <p className="max-w-2xl mx-auto" style={{ color: 'var(--foreground-secondary)' }}>
            Structured learning paths designed to take you from beginner to expert. 
            Follow a roadmap that matches your career goals.
          </p>
        </div>

        {!selectedPath ? (
          <>
            {/* Path Selection Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {learningPaths.map((path) => (
                <button
                  key={path.id}
                  onClick={() => setSelectedPath(path.id)}
                  className="text-left p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.02] group"
                  style={{ 
                    backgroundColor: 'var(--card)',
                    borderColor: 'var(--card-border)'
                  }}>
                  <div className="flex items-start justify-between mb-4">
                    <div 
                      className="p-3 rounded-xl"
                      style={{ backgroundColor: `${path.color}20` }}>
                      <span style={{ color: path.color }}>{path.icon}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all"
                      style={{ color: path.color }} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                    {path.title}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: 'var(--foreground-secondary)' }}>
                    {path.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1" style={{ color: 'var(--foreground-muted)' }}>
                      <Target className="w-4 h-4" />
                      {path.totalQuestions} questions
                    </span>
                    <span className="flex items-center gap-1" style={{ color: 'var(--foreground-muted)' }}>
                      <Clock className="w-4 h-4" />
                      {path.totalHours} hours
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Tips Section */}
            <div className="mt-12 p-6 rounded-2xl border"
              style={{ 
                backgroundColor: 'rgba(59, 130, 246, 0.05)',
                borderColor: 'rgba(59, 130, 246, 0.2)'
              }}>
              <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                How to Use These Roadmaps
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--background-secondary)' }}>
                    <BookOpen className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm" style={{ color: 'var(--foreground)' }}>Study Topics</h4>
                    <p className="text-xs mt-1" style={{ color: 'var(--foreground-muted)' }}>
                      Go through each topic systematically
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--background-secondary)' }}>
                    <Zap className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm" style={{ color: 'var(--foreground)' }}>Practice Questions</h4>
                    <p className="text-xs mt-1" style={{ color: 'var(--foreground-muted)' }}>
                      Test your knowledge with quizzes
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--background-secondary)' }}>
                    <Award className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm" style={{ color: 'var(--foreground)' }}>Track Progress</h4>
                    <p className="text-xs mt-1" style={{ color: 'var(--foreground-muted)' }}>
                      Monitor your learning streak
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Back Button */}
            <button
              onClick={() => setSelectedPath(null)}
              className="mb-6 text-sm flex items-center gap-1 transition-all hover:gap-2"
              style={{ color: 'var(--primary)' }}>
              <ChevronRight className="w-4 h-4 rotate-180" />
              Back to Roadmaps
            </button>

            {/* Path Header */}
            <div className="mb-8 p-6 rounded-2xl border"
              style={{ 
                backgroundColor: `${activePath?.color}10`,
                borderColor: `${activePath?.color}30`
              }}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div 
                  className="p-4 rounded-2xl"
                  style={{ backgroundColor: `${activePath?.color}20` }}>
                  <span style={{ color: activePath?.color, fontSize: '2rem' }}>
                    {activePath?.icon}
                  </span>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>
                    {activePath?.title}
                  </h2>
                  <p style={{ color: 'var(--foreground-secondary)' }}>
                    {activePath?.description}
                  </p>
                </div>
                <Link
                  href="/main/quiz"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all"
                  style={{ 
                    backgroundColor: activePath?.color,
                    color: 'white'
                  }}>
                  <Play className="w-4 h-4" />
                  Start Quiz
                </Link>
              </div>
            </div>

            {/* Stages Timeline */}
            <div className="space-y-6">
              {activePath?.stages.map((stage, index) => (
                <div key={stage.id} className="relative">
                  {/* Connection Line */}
                  {index < activePath.stages.length - 1 && (
                    <div className="absolute left-6 top-16 w-0.5 h-12"
                      style={{ backgroundColor: 'var(--card-border)' }} />
                  )}
                  
                  <div className="flex gap-4">
                    {/* Stage Number */}
                    <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold"
                      style={{ 
                        backgroundColor: `${activePath?.color}20`,
                        color: activePath?.color
                      }}>
                      {index + 1}
                    </div>
                    
                    {/* Stage Content */}
                    <div className="flex-1 p-6 rounded-2xl border"
                      style={{ 
                        backgroundColor: 'var(--card)',
                        borderColor: 'var(--card-border)'
                      }}>
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
                              {stage.title}
                            </h3>
                            <span className={cn(
                              'px-2 py-0.5 text-xs rounded-full',
                              stage.difficulty === 'beginner' && 'bg-green-500/20 text-green-400',
                              stage.difficulty === 'intermediate' && 'bg-yellow-500/20 text-yellow-400',
                              stage.difficulty === 'advanced' && 'bg-red-500/20 text-red-400',
                            )}>
                              {stage.difficulty}
                            </span>
                          </div>
                          <p className="text-sm" style={{ color: 'var(--foreground-secondary)' }}>
                            {stage.description}
                          </p>
                        </div>
                      </div>

                      {/* Topics */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {stage.topics.map((topic) => (
                          <span
                            key={topic}
                            className="px-3 py-1 text-xs rounded-full border"
                            style={{ 
                              backgroundColor: 'var(--background-secondary)',
                              borderColor: 'var(--card-border)',
                              color: 'var(--foreground-secondary)'
                            }}>
                            {topic}
                          </span>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-4 text-sm pt-4 border-t"
                        style={{ borderColor: 'var(--card-border)' }}>
                        <span className="flex items-center gap-1" style={{ color: 'var(--foreground-muted)' }}>
                          <Target className="w-4 h-4" />
                          {stage.questionCount} questions
                        </span>
                        <span className="flex items-center gap-1" style={{ color: 'var(--foreground-muted)' }}>
                          <Clock className="w-4 h-4" />
                          {stage.estimatedHours} hours
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
