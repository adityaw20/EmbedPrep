const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const Question = require('../models/Question');
const realQuestions = require('./realQuestions');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

// Sample questions data - organized by categories
const sampleQuestions = [
  // C Programming - Variables and Data Types
  {
    category: "C Programming",
    subcategory: "Variables and Data Types",
    type: "MCQ",
    difficulty: "Easy",
    experienceLevel: "Fresher",
    question: "What is the size of int data type in C on a 32-bit system?",
    options: [
      { id: "a", text: "2 bytes" },
      { id: "b", text: "4 bytes" },
      { id: "c", text: "8 bytes" },
      { id: "d", text: "Depends on compiler" }
    ],
    correctAnswer: "b",
    explanation: "On most 32-bit and 64-bit systems, int is 4 bytes (32 bits). However, the standard only guarantees that int is at least 16 bits. The actual size can vary by platform.",
    tags: ["C", "Data Types", "Variables"]
  },
  {
    category: "C Programming",
    subcategory: "Variables and Data Types",
    type: "MCQ",
    difficulty: "Easy",
    experienceLevel: "Fresher",
    question: "Which data type is used to store a single character in C?",
    options: [
      { id: "a", text: "string" },
      { id: "b", text: "char" },
      { id: "c", text: "character" },
      { id: "d", text: "str" }
    ],
    correctAnswer: "b",
    explanation: "The 'char' data type in C is used to store a single character. It occupies 1 byte of memory.",
    tags: ["C", "Data Types", "char"]
  },
  {
    category: "C Programming",
    subcategory: "Variables and Data Types",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "Fresher",
    question: "What is the range of signed char in C?",
    options: [
      { id: "a", text: "0 to 255" },
      { id: "b", text: "-128 to 127" },
      { id: "c", text: "-127 to 128" },
      { id: "d", text: "-256 to 255" }
    ],
    correctAnswer: "b",
    explanation: "A signed char uses 1 byte (8 bits) with the MSB as sign bit. Range is -128 to 127.",
    tags: ["C", "Data Types", "Range"]
  },
  
  // C Programming - Pointers
  {
    category: "C Programming",
    subcategory: "Pointers",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "What does the following code output?\nint x = 10;\nint *p = &x;\nprintf(\"%d\", *p);",
    codeSnippet: "int x = 10;\nint *p = &x;\nprintf(\"%d\", *p);",
    options: [
      { id: "a", text: "Address of x" },
      { id: "b", text: "10" },
      { id: "c", text: "Address of p" },
      { id: "d", text: "Garbage value" }
    ],
    correctAnswer: "b",
    explanation: "*p dereferences the pointer, giving the value at the address stored in p. Since p points to x, *p equals 10.",
    tags: ["C", "Pointers", "Dereference"]
  },
  {
    category: "C Programming",
    subcategory: "Pointers",
    type: "MCQ",
    difficulty: "Hard",
    experienceLevel: "1-3 Years",
    question: "What is the size of a pointer in C on a 64-bit system?",
    options: [
      { id: "a", text: "2 bytes" },
      { id: "b", text: "4 bytes" },
      { id: "c", text: "8 bytes" },
      { id: "d", text: "Depends on data type pointed to" }
    ],
    correctAnswer: "c",
    explanation: "On 64-bit systems, pointers are typically 8 bytes (64 bits) regardless of the data type they point to.",
    tags: ["C", "Pointers", "Memory"]
  },
  {
    category: "C Programming",
    subcategory: "Pointers",
    type: "DESCRIPTIVE",
    difficulty: "Hard",
    experienceLevel: "3-5 Years",
    question: "Explain the difference between const int *p, int *const p, and const int *const p.",
    correctAnswer: "const int *p: Pointer to constant int (can't modify value through p)\nint *const p: Constant pointer to int (can't change where p points)\nconst int *const p: Constant pointer to constant int (neither can change)",
    explanation: "The position of const determines what cannot be modified. const before * applies to the value, const after * applies to the pointer itself.",
    tags: ["C", "Pointers", "const"]
  },
  
  // C Programming - Arrays and Strings
  {
    category: "C Programming",
    subcategory: "Arrays and Strings",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "Fresher",
    question: "What is the output of: char str[] = \"Hello\"; printf(\"%zu\", sizeof(str));",
    options: [
      { id: "a", text: "5" },
      { id: "b", text: "6" },
      { id: "c", text: "4" },
      { id: "d", text: "Depends on compiler" }
    ],
    correctAnswer: "b",
    explanation: "sizeof(str) returns 6 because \"Hello\" includes 5 characters plus the null terminator \\0.",
    tags: ["C", "Strings", "Arrays", "sizeof"]
  },
  {
    category: "C Programming",
    subcategory: "Arrays and Strings",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "What happens when you try to access arr[5] for an array int arr[5]?",
    options: [
      { id: "a", text: "Compilation error" },
      { id: "b", text: "Runtime error" },
      { id: "c", text: "Undefined behavior" },
      { id: "d", text: "Returns 0" }
    ],
    correctAnswer: "c",
    explanation: "Array index out of bounds results in undefined behavior. The program may crash, return garbage values, or appear to work.",
    tags: ["C", "Arrays", "Undefined Behavior"]
  },

  // C++ Programming - Basics
  {
    category: "C++ Programming",
    subcategory: "Basics",
    type: "MCQ",
    difficulty: "Easy",
    experienceLevel: "Fresher",
    question: "Who created C++?",
    options: [
      { id: "a", text: "Dennis Ritchie" },
      { id: "b", text: "Bjarne Stroustrup" },
      { id: "c", text: "James Gosling" },
      { id: "d", text: "Guido van Rossum" }
    ],
    correctAnswer: "b",
    explanation: "Bjarne Stroustrup created C++ at Bell Labs in 1979 as an extension of C.",
    tags: ["C++", "History", "Basics"]
  },
  {
    category: "C++ Programming",
    subcategory: "OOP",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "What is the default access specifier for class members in C++?",
    options: [
      { id: "a", text: "public" },
      { id: "b", text: "private" },
      { id: "c", text: "protected" },
      { id: "d", text: "internal" }
    ],
    correctAnswer: "b",
    explanation: "In C++, class members are private by default. In structs, they are public by default.",
    tags: ["C++", "OOP", "Access Specifiers"]
  },
  {
    category: "C++ Programming",
    subcategory: "OOP",
    type: "MCQ",
    difficulty: "Hard",
    experienceLevel: "3-5 Years",
    question: "What is the output of the following code?\nclass Base { public: virtual void show() {} };\nclass Derived : public Base {};\nint main() { cout << sizeof(Base) << sizeof(Derived); }",
    options: [
      { id: "a", text: "1 1" },
      { id: "b", text: "4 4 or 8 8 (pointer size)" },
      { id: "c", text: "0 0" },
      { id: "d", text: "Compilation error" }
    ],
    correctAnswer: "b",
    explanation: "Classes with virtual functions have a vptr (virtual pointer) to the vtable. Size is typically pointer size (4 or 8 bytes).",
    tags: ["C++", "OOP", "Virtual Functions", "vtable"]
  },

  // Communication Protocols - UART
  {
    category: "Communication Protocols",
    subcategory: "UART",
    type: "MCQ",
    difficulty: "Easy",
    experienceLevel: "Fresher",
    question: "UART stands for:",
    options: [
      { id: "a", text: "Universal Asynchronous Receiver Transmitter" },
      { id: "b", text: "Universal Synchronous Receiver Transmitter" },
      { id: "c", text: "Universal Asynchronous Receive Transmit" },
      { id: "d", text: "Uniform Asynchronous Receiver Transmitter" }
    ],
    correctAnswer: "a",
    explanation: "UART stands for Universal Asynchronous Receiver/Transmitter. It's asynchronous, meaning no clock signal is shared.",
    tags: ["UART", "Serial Communication", "Protocols"]
  },
  {
    category: "Communication Protocols",
    subcategory: "UART",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "What is the typical voltage level for UART logic HIGH in TTL?",
    options: [
      { id: "a", text: "0V" },
      { id: "b", text: "3.3V or 5V" },
      { id: "c", text: "12V" },
      { id: "d", text: "-12V to +12V" }
    ],
    correctAnswer: "b",
    explanation: "TTL UART uses 3.3V or 5V for logic HIGH and 0V for logic LOW. RS-232 uses different voltage levels (-12V to +12V).",
    tags: ["UART", "TTL", "Voltage Levels"]
  },
  
  // Communication Protocols - SPI
  {
    category: "Communication Protocols",
    subcategory: "SPI",
    type: "MCQ",
    difficulty: "Easy",
    experienceLevel: "Fresher",
    question: "SPI uses how many wires minimum?",
    options: [
      { id: "a", text: "2" },
      { id: "b", text: "3" },
      { id: "c", text: "4" },
      { id: "d", text: "1" }
    ],
    correctAnswer: "c",
    explanation: "SPI uses 4 wires minimum: MOSI (Master Out Slave In), MISO (Master In Slave Out), SCLK (Clock), and CS/SS (Chip Select).",
    tags: ["SPI", "Serial Communication", "Protocols"]
  },
  {
    category: "Communication Protocols",
    subcategory: "SPI",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "In SPI, which signal is used to select a specific slave device?",
    options: [
      { id: "a", text: "MOSI" },
      { id: "b", text: "MISO" },
      { id: "c", text: "SCLK" },
      { id: "d", text: "CS or SS" }
    ],
    correctAnswer: "d",
    explanation: "CS (Chip Select) or SS (Slave Select) is used by the master to select a specific slave device. It's usually active low.",
    tags: ["SPI", "Chip Select", "Protocols"]
  },

  // Communication Protocols - I2C
  {
    category: "Communication Protocols",
    subcategory: "I2C",
    type: "MCQ",
    difficulty: "Easy",
    experienceLevel: "Fresher",
    question: "I2C uses how many wires?",
    options: [
      { id: "a", text: "4" },
      { id: "b", text: "3" },
      { id: "c", text: "2" },
      { id: "d", text: "1" }
    ],
    correctAnswer: "c",
    explanation: "I2C uses only 2 wires: SDA (Serial Data) and SCL (Serial Clock). Both are open-drain and require pull-up resistors.",
    tags: ["I2C", "Serial Communication", "Protocols"]
  },
  {
    category: "Communication Protocols",
    subcategory: "I2C",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "What is the maximum number of devices that can be connected on a single I2C bus?",
    options: [
      { id: "a", text: "8" },
      { id: "b", text: "16" },
      { id: "c", text: "128" },
      { id: "d", text: "Limited by address space (127 7-bit addresses) and bus capacitance" }
    ],
    correctAnswer: "d",
    explanation: "With 7-bit addressing, 128 addresses are possible (0-127). However, some are reserved, and bus capacitance (max 400pF) is the practical limit.",
    tags: ["I2C", "Addressing", "Bus"]
  },

  // Communication Protocols - CAN
  {
    category: "Communication Protocols",
    subcategory: "CAN",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "CAN bus uses which topology?",
    options: [
      { id: "a", text: "Star" },
      { id: "b", text: "Bus/Multi-master" },
      { id: "c", text: "Ring" },
      { id: "d", text: "Mesh" }
    ],
    correctAnswer: "b",
    explanation: "CAN uses a multi-master bus topology where all nodes are connected to a shared bus. Any node can transmit when the bus is idle.",
    tags: ["CAN", "Topology", "Automotive"]
  },
  {
    category: "Communication Protocols",
    subcategory: "CAN",
    type: "MCQ",
    difficulty: "Hard",
    experienceLevel: "3-5 Years",
    question: "What is the arbitration mechanism used in CAN bus?",
    options: [
      { id: "a", text: "Token passing" },
      { id: "b", text: "CSMA/CA with bitwise arbitration" },
      { id: "c", text: "Master polling" },
      { id: "d", text: "Time division multiplexing" }
    ],
    correctAnswer: "b",
    explanation: "CAN uses CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance) with bitwise arbitration. The message with the lowest identifier wins.",
    tags: ["CAN", "Arbitration", "CSMA"]
  },

  // Communication Protocols - MQTT
  {
    category: "Communication Protocols",
    subcategory: "MQTT",
    type: "MCQ",
    difficulty: "Easy",
    experienceLevel: "1-3 Years",
    question: "MQTT operates on which layer of the OSI model?",
    options: [
      { id: "a", text: "Transport Layer" },
      { id: "b", text: "Application Layer" },
      { id: "c", text: "Network Layer" },
      { id: "d", text: "Session Layer" }
    ],
    correctAnswer: "b",
    explanation: "MQTT is an application layer protocol that typically runs over TCP/IP. It's designed for lightweight IoT messaging.",
    tags: ["MQTT", "IoT", "Application Layer"]
  },
  {
    category: "Communication Protocols",
    subcategory: "MQTT",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "In MQTT, what is the role of the Broker?",
    options: [
      { id: "a", text: "It generates MQTT messages" },
      { id: "b", text: "It routes messages between publishers and subscribers" },
      { id: "c", text: "It encrypts all messages" },
      { id: "d", text: "It stores all messages permanently" }
    ],
    correctAnswer: "b",
    explanation: "The MQTT broker receives all messages from publishers and routes them to appropriate subscribers based on topics.",
    tags: ["MQTT", "Broker", "Pub/Sub"]
  },

  // Communication Protocols - BLE
  {
    category: "Communication Protocols",
    subcategory: "BLE",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "What is the maximum data rate of BLE 5.0?",
    options: [
      { id: "a", text: "1 Mbps" },
      { id: "b", text: "2 Mbps" },
      { id: "c", text: "3 Mbps" },
      { id: "d", text: "54 Mbps" }
    ],
    correctAnswer: "b",
    explanation: "BLE 5.0 supports 2 Mbps PHY (physical layer) for higher data rates. BLE 4.x was limited to 1 Mbps.",
    tags: ["BLE", "Bluetooth", "Data Rate"]
  },
  {
    category: "Communication Protocols",
    subcategory: "BLE",
    type: "DESCRIPTIVE",
    difficulty: "Hard",
    experienceLevel: "3-5 Years",
    question: "Explain the difference between BLE GAP and GATT roles.",
    correctAnswer: "GAP (Generic Access Profile) defines device discovery, connection, and security procedures. Roles: Peripheral/Central. GATT (Generic Attribute Profile) defines data exchange after connection. Roles: Server/Client. A device can be Central + Client or Central + Server simultaneously.",
    explanation: "GAP handles connection establishment while GATT handles data communication. The roles are independent - a Central can be GATT Server and a Peripheral can be GATT Client.",
    tags: ["BLE", "GATT", "GAP", "Profiles"]
  },

  // Embedded Systems - Interrupts
  {
    category: "Embedded Systems",
    subcategory: "Interrupts",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "What is the purpose of the ISR (Interrupt Service Routine)?",
    options: [
      { id: "a", text: "To initialize the microcontroller" },
      { id: "b", text: "To handle hardware events asynchronously" },
      { id: "c", text: "To configure GPIO pins" },
      { id: "d", text: "To manage memory allocation" }
    ],
    correctAnswer: "b",
    explanation: "ISR is a callback function that executes when a specific interrupt occurs, allowing the system to respond to hardware events immediately.",
    tags: ["Embedded", "ISR", "Interrupts"]
  },
  {
    category: "Embedded Systems",
    subcategory: "Interrupts",
    type: "MCQ",
    difficulty: "Hard",
    experienceLevel: "3-5 Years",
    question: "What is interrupt latency?",
    options: [
      { id: "a", text: "The time an ISR takes to execute" },
      { id: "b", text: "The time between interrupt occurrence and ISR execution start" },
      { id: "c", text: "The time between two interrupts" },
      { id: "d", text: "The priority of an interrupt" }
    ],
    correctAnswer: "b",
    explanation: "Interrupt latency is the time from when an interrupt is generated to when the first instruction of the ISR executes. It includes hardware and software delays.",
    tags: ["Embedded", "Interrupts", "Latency", "Performance"]
  },

  // Embedded Systems - Memory
  {
    category: "Embedded Systems",
    subcategory: "Memory",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "Which memory type is volatile?",
    options: [
      { id: "a", text: "Flash" },
      { id: "b", text: "EEPROM" },
      { id: "c", text: "SRAM" },
      { id: "d", text: "ROM" }
    ],
    correctAnswer: "c",
    explanation: "SRAM (Static RAM) is volatile - it loses data when power is removed. Flash, EEPROM, and ROM are non-volatile.",
    tags: ["Embedded", "Memory", "SRAM", "Volatile"]
  },
  {
    category: "Embedded Systems",
    subcategory: "Memory",
    type: "DESCRIPTIVE",
    difficulty: "Hard",
    experienceLevel: "3-5 Years",
    question: "Explain the difference between Von Neumann and Harvard architecture.",
    correctAnswer: "Von Neumann uses a single bus for both instructions and data. Harvard has separate buses for instructions and data, allowing simultaneous access. Most modern MCUs use modified Harvard architecture.",
    explanation: "Harvard architecture provides better performance through parallel instruction and data access. Modified Harvard allows some flexibility while maintaining performance benefits.",
    tags: ["Embedded", "Architecture", "Memory", "Harvard"]
  },

  // RTOS
  {
    category: "RTOS",
    subcategory: "Fundamentals",
    type: "MCQ",
    difficulty: "Easy",
    experienceLevel: "1-3 Years",
    question: "RTOS stands for:",
    options: [
      { id: "a", text: "Real-Time Operating System" },
      { id: "b", text: "Run-Time Operating System" },
      { id: "c", text: "Real-Time Operation System" },
      { id: "d", text: "Rapid Task Operating System" }
    ],
    correctAnswer: "a",
    explanation: "RTOS stands for Real-Time Operating System, designed to process data and events with guaranteed time constraints.",
    tags: ["RTOS", "Basics", "Definitions"]
  },
  {
    category: "RTOS",
    subcategory: "Scheduling",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "Which scheduling algorithm is most commonly used in RTOS?",
    options: [
      { id: "a", text: "First Come First Serve" },
      { id: "b", text: "Priority-based Preemptive Scheduling" },
      { id: "c", text: "Round Robin" },
      { id: "d", text: "Shortest Job First" }
    ],
    correctAnswer: "b",
    explanation: "Most RTOS use priority-based preemptive scheduling where the highest priority ready task runs immediately, preempting lower priority tasks.",
    tags: ["RTOS", "Scheduling", "Preemption"]
  },
  {
    category: "RTOS",
    subcategory: "Tasks",
    type: "MCQ",
    difficulty: "Hard",
    experienceLevel: "3-5 Years",
    question: "What is priority inversion in RTOS?",
    options: [
      { id: "a", text: "A low priority task runs before high priority" },
      { id: "b", text: "A high priority task is blocked by a low priority task holding a shared resource" },
      { id: "c", text: "Task priorities are swapped" },
      { id: "d", text: "All tasks run at the same priority" }
    ],
    correctAnswer: "b",
    explanation: "Priority inversion occurs when a high-priority task is blocked waiting for a resource held by a low-priority task. Priority inheritance protocol can solve this.",
    tags: ["RTOS", "Priority Inversion", "Synchronization"]
  },
  {
    category: "RTOS",
    subcategory: "Synchronization",
    type: "DESCRIPTIVE",
    difficulty: "Hard",
    experienceLevel: "3-5 Years",
    question: "Explain the difference between Mutex and Semaphore.",
    correctAnswer: "Mutex is for mutual exclusion (binary, ownership concept, priority inheritance). Semaphore is for signaling/counting (can have count > 1, no ownership). Mutex should be unlocked by the same task; semaphore can be signaled by different tasks.",
    explanation: "Mutexes are best for protecting shared resources with single access. Semaphores are better for signaling between tasks or managing multiple identical resources.",
    tags: ["RTOS", "Mutex", "Semaphore", "Synchronization"]
  },

  // Microcontrollers - STM32
  {
    category: "Microcontrollers",
    subcategory: "STM32",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "What is the maximum clock frequency of STM32F4 series?",
    options: [
      { id: "a", text: "72 MHz" },
      { id: "b", text: "168 MHz" },
      { id: "c", text: "180 MHz" },
      { id: "d", text: "480 MHz" }
    ],
    correctAnswer: "c",
    explanation: "STM32F4 series can run up to 180 MHz. STM32F7 can go up to 216 MHz, and STM32H7 up to 480 MHz.",
    tags: ["STM32", "ARM", "Clock", "Cortex-M"]
  },
  {
    category: "Microcontrollers",
    subcategory: "STM32",
    type: "MCQ",
    difficulty: "Hard",
    experienceLevel: "3-5 Years",
    question: "What does the Cortex-M4 FPU support?",
    options: [
      { id: "a", text: "Single precision only" },
      { id: "b", text: "Double precision only" },
      { id: "c", text: "Both single and double precision" },
      { id: "d", text: "No floating point support" }
    ],
    correctAnswer: "a",
    explanation: "Cortex-M4 FPU supports single-precision (32-bit) floating point operations. Double precision requires software emulation or Cortex-M7.",
    tags: ["STM32", "Cortex-M4", "FPU", "Floating Point"]
  },

  // Microcontrollers - ESP32
  {
    category: "Microcontrollers",
    subcategory: "ESP32",
    type: "MCQ",
    difficulty: "Easy",
    experienceLevel: "Fresher",
    question: "ESP32 is manufactured by:",
    options: [
      { id: "a", text: "STMicroelectronics" },
      { id: "b", text: "Espressif Systems" },
      { id: "c", text: "Microchip" },
      { id: "d", text: "Texas Instruments" }
    ],
    correctAnswer: "b",
    explanation: "ESP32 is developed and manufactured by Espressif Systems, a Chinese company.",
    tags: ["ESP32", "WiFi", "IoT"]
  },
  {
    category: "Microcontrollers",
    subcategory: "ESP32",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "ESP32 has how many processor cores?",
    options: [
      { id: "a", text: "1" },
      { id: "b", text: "2" },
      { id: "c", text: "4" },
      { id: "d", text: "8" }
    ],
    correctAnswer: "b",
    explanation: "ESP32 has dual-core Xtensa LX6 microprocessors (can run up to 240 MHz). Both cores can be used simultaneously.",
    tags: ["ESP32", "Dual Core", "Xtensa"]
  },

  // Microcontrollers - ARM
  {
    category: "Microcontrollers",
    subcategory: "ARM",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "ARM Cortex-M processors use which instruction set?",
    options: [
      { id: "a", text: "ARM 32-bit only" },
      { id: "b", text: "Thumb/Thumb-2" },
      { id: "c", text: "x86" },
      { id: "d", text: "MIPS" }
    ],
    correctAnswer: "b",
    explanation: "Cortex-M uses Thumb-2 technology, which is a mix of 16-bit and 32-bit instructions for code density and performance.",
    tags: ["ARM", "Cortex-M", "Instruction Set", "Thumb"]
  },
  {
    category: "Microcontrollers",
    subcategory: "ARM",
    type: "MCQ",
    difficulty: "Hard",
    experienceLevel: "3-5 Years",
    question: "What is the purpose of the NVIC in Cortex-M?",
    options: [
      { id: "a", text: "Network Vector Interrupt Controller" },
      { id: "b", text: "Nested Vectored Interrupt Controller" },
      { id: "c", text: "Native Vector Interrupt Controller" },
      { id: "d", text: "New Virtual Interrupt Controller" }
    ],
    correctAnswer: "b",
    explanation: "NVIC (Nested Vectored Interrupt Controller) manages interrupts with nested priority support, low latency, and efficient interrupt handling.",
    tags: ["ARM", "NVIC", "Interrupts", "Cortex-M"]
  },

  // IoT
  {
    category: "IoT",
    subcategory: "Fundamentals",
    type: "MCQ",
    difficulty: "Easy",
    experienceLevel: "Fresher",
    question: "IoT stands for:",
    options: [
      { id: "a", text: "Internet of Technology" },
      { id: "b", text: "Internet of Things" },
      { id: "c", text: "Integration of Things" },
      { id: "d", text: "Intelligent Object Technology" }
    ],
    correctAnswer: "b",
    explanation: "IoT stands for Internet of Things, referring to the network of physical devices embedded with sensors and connectivity.",
    tags: ["IoT", "Basics", "Definitions"]
  },
  {
    category: "IoT",
    subcategory: "Protocols",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "Which protocol is designed for constrained IoT devices?",
    options: [
      { id: "a", text: "HTTP" },
      { id: "b", text: "CoAP" },
      { id: "c", text: "FTP" },
      { id: "d", text: "SMTP" }
    ],
    correctAnswer: "b",
    explanation: "CoAP (Constrained Application Protocol) is designed for constrained devices and networks, using UDP instead of TCP.",
    tags: ["IoT", "CoAP", "Protocols", "Constrained"]
  },
  {
    category: "IoT",
    subcategory: "Security",
    type: "DESCRIPTIVE",
    difficulty: "Hard",
    experienceLevel: "3-5 Years",
    question: "Explain the key security challenges in IoT devices.",
    correctAnswer: "Key challenges: 1) Limited resources for encryption 2) Physical accessibility for attacks 3) Long deployment lifecycles 4) Diverse ecosystem 5) Insecure default credentials 6) Lack of update mechanisms 7) Privacy concerns with sensor data",
    explanation: "IoT security requires balancing resource constraints with robust protection. Solutions include hardware security modules, secure boot, OTA updates, and network segmentation.",
    tags: ["IoT", "Security", "Challenges"]
  },

  // PCB & Hardware Design
  {
    category: "PCB & Hardware Design",
    subcategory: "Basics",
    type: "MCQ",
    difficulty: "Easy",
    experienceLevel: "Fresher",
    question: "PCB stands for:",
    options: [
      { id: "a", text: "Printed Circuit Board" },
      { id: "b", text: "Programmable Circuit Board" },
      { id: "c", text: "Processed Circuit Base" },
      { id: "d", text: "Primary Circuit Board" }
    ],
    correctAnswer: "a",
    explanation: "PCB stands for Printed Circuit Board, which mechanically supports and electrically connects electronic components.",
    tags: ["PCB", "Hardware", "Basics"]
  },
  {
    category: "PCB & Hardware Design",
    subcategory: "Design",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "What is the purpose of decoupling capacitors?",
    options: [
      { id: "a", text: "To increase signal speed" },
      { id: "b", text: "To filter high-frequency noise and provide local charge storage" },
      { id: "c", text: "To amplify signals" },
      { id: "d", text: "To convert AC to DC" }
    ],
    correctAnswer: "b",
    explanation: "Decoupling capacitors filter high-frequency noise from power supplies and provide local charge reservoirs for ICs during switching.",
    tags: ["PCB", "Decoupling", "Capacitors", "Power"]
  },
  {
    category: "PCB & Hardware Design",
    subcategory: "Signal Integrity",
    type: "MCQ",
    difficulty: "Hard",
    experienceLevel: "3-5 Years",
    question: "What is controlled impedance in PCB design?",
    options: [
      { id: "a", text: "Limiting maximum current" },
      { id: "b", text: "Matching trace impedance to source/load for signal integrity" },
      { id: "c", text: "Controlling voltage levels" },
      { id: "d", text: "Reducing EMI" }
    ],
    correctAnswer: "b",
    explanation: "Controlled impedance matches the trace characteristic impedance (typically 50Ω or 100Ω differential) to prevent reflections in high-speed signals.",
    tags: ["PCB", "Impedance", "Signal Integrity", "High Speed"]
  },

  // Interview Questions - Fresher
  {
    category: "Interview Questions",
    subcategory: "Fresher",
    type: "DESCRIPTIVE",
    difficulty: "Easy",
    experienceLevel: "Fresher",
    question: "What is the difference between microprocessor and microcontroller?",
    correctAnswer: "Microprocessor: CPU only, requires external RAM/ROM/I/O, general purpose, higher performance, expensive. Microcontroller: CPU + RAM + ROM + I/O on single chip, application-specific, lower power, cost-effective for embedded systems.",
    explanation: "Microcontrollers are self-contained SoCs ideal for embedded applications. Microprocessors need external components but offer more flexibility and processing power.",
    tags: ["Interview", "Microprocessor", "Microcontroller", "Basics"]
  },
  {
    category: "Interview Questions",
    subcategory: "Fresher",
    type: "DESCRIPTIVE",
    difficulty: "Medium",
    experienceLevel: "Fresher",
    question: "Explain what happens when you reset a microcontroller.",
    correctAnswer: "On reset: 1) PC loaded with reset vector address 2) Stack pointer initialized 3) Clock system initialized 4) Peripherals reset to default state 5) Execution starts from reset handler (boot code).",
    explanation: "Reset brings the MCU to a known initial state. Types include Power-on reset, External reset, Watchdog reset, and Software reset.",
    tags: ["Interview", "Reset", "Microcontroller", "Boot"]
  },

  // Interview Questions - 1-3 Years
  {
    category: "Interview Questions",
    subcategory: "1-3 Years",
    type: "DESCRIPTIVE",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "How would you debug a system that randomly hangs?",
    correctAnswer: "Approach: 1) Check watchdog timeout 2) Analyze stack overflow 3) Check for memory corruption 4) Verify interrupt handlers 5) Use debugger with breakpoints 6) Add logging/trace 7) Check power supply stability 8) Review race conditions in multi-threaded code.",
    explanation: "Random hangs often indicate memory issues, stack overflow, interrupt problems, or race conditions. Systematic elimination helps identify root cause.",
    tags: ["Interview", "Debugging", "Troubleshooting"]
  },

  // Interview Questions - 3-5 Years
  {
    category: "Interview Questions",
    subcategory: "3-5 Years",
    type: "DESCRIPTIVE",
    difficulty: "Hard",
    experienceLevel: "3-5 Years",
    question: "Design a low-power IoT sensor node. What factors would you consider?",
    correctAnswer: "Considerations: 1) MCU sleep modes and wake sources 2) Sensor duty cycling 3) Wireless protocol (BLE LoRa) and transmission power 4) Data buffering and batch transmission 5) Power supply (battery, energy harvesting) 6) Hardware design (regulator efficiency) 7) Firmware architecture (event-driven, RTOS)",
    explanation: "Low-power design requires optimization at all levels: hardware selection, communication strategy, sleep management, and efficient algorithms.",
    tags: ["Interview", "Low Power", "IoT", "Design"]
  },

  // Interview Questions - Automotive
  {
    category: "Interview Questions",
    subcategory: "Automotive",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "Automotive",
    question: "Which ISO standard defines automotive functional safety?",
    options: [
      { id: "a", text: "ISO 9001" },
      { id: "b", text: "ISO 26262" },
      { id: "c", text: "ISO 14001" },
      { id: "d", text: "ISO/IEC 27001" }
    ],
    correctAnswer: "b",
    explanation: "ISO 26262 is the international standard for functional safety of electrical/electronic systems in production automobiles, adapted from IEC 61508.",
    tags: ["Interview", "Automotive", "ISO 26262", "Functional Safety"]
  },
  {
    category: "Interview Questions",
    subcategory: "Automotive",
    type: "DESCRIPTIVE",
    difficulty: "Hard",
    experienceLevel: "Automotive",
    question: "What is ASIL and what are its levels?",
    correctAnswer: "ASIL (Automotive Safety Integrity Level) classifies safety requirements. Levels: ASIL A (lowest), ASIL B, ASIL C, ASIL D (highest - e.g., steering, braking). QM (Quality Management) applies when no safety relevance. Determined by Severity, Exposure, and Controllability.",
    explanation: "Higher ASIL levels require more rigorous processes: redundancy, analysis, testing, and documentation.",
    tags: ["Interview", "Automotive", "ASIL", "Safety"]
  },

  // Interview Questions - Product Companies
  {
    category: "Interview Questions",
    subcategory: "Product Companies",
    type: "DESCRIPTIVE",
    difficulty: "Hard",
    experienceLevel: "Product Companies",
    question: "How would you design a firmware update (OTA) system for IoT devices?",
    correctAnswer: "Design: 1) Secure download (TLS, signature verification) 2) Dual bank flash for fail-safe 3) Version checking and rollback 4) Power-fail safe updates 5) Progress reporting 6) Resource validation 7) Bootloader support 8) Factory reset option. Security is critical: encryption, signing, secure boot.",
    explanation: "OTA updates must be secure, reliable, and recoverable from failures. Dual-bank allows atomic updates and easy rollback.",
    tags: ["Interview", "OTA", "Firmware Update", "IoT"]
  }
];

// Function to generate more questions programmatically
const generateMoreQuestions = () => {
  const additionalQuestions = [];
  const categories = {
    "C Programming": ["Control Flow", "Functions", "Structures", "Bitwise Operations", "Memory Management", "Preprocessor"],
    "C++ Programming": ["STL", "Templates", "Smart Pointers", "Move Semantics", "Lambda", "Inheritance"],
    "Communication Protocols": ["Modbus", "LIN", "LoRa", "USB", "Ethernet", "Zigbee"],
    "Embedded Systems": ["GPIO", "Timers", "DMA", "ADC/DAC", "Watchdog", "Bootloader"],
    "RTOS": ["FreeRTOS", "Zephyr", "ThreadX", "Tasks", "Queues", "Timers"],
    "Microcontrollers": ["STM32", "ESP32", "AVR", "PIC", "Nordic", "TI"],
    "IoT": ["AWS IoT", "Azure IoT", "Node-RED", "Sensors", "Edge Computing", "5G"],
    "PCB & Hardware Design": ["Power Supply", "EMI/EMC", "High Speed", "Layout", "Testing"],
    "Interview Questions": ["Coding", "System Design", "Behavioral", "Resume Discussion"]
  };

  const difficulties = ["Easy", "Medium", "Hard"];
  const experienceLevels = ["Fresher", "1-3 Years", "3-5 Years", "5+ Years", "Automotive", "Product Companies"];
  const types = ["MCQ", "DESCRIPTIVE"];

  let idCounter = sampleQuestions.length + 1;

  // Generate ~900 more questions by variations
  Object.entries(categories).forEach(([category, subcategories]) => {
    subcategories.forEach((subcategory, subIdx) => {
      difficulties.forEach((difficulty, diffIdx) => {
        experienceLevels.forEach((expLevel, expIdx) => {
          // Generate 2-4 questions per combination
          const count = 2 + Math.floor(Math.random() * 3);
          
          for (let i = 0; i < count; i++) {
            const type = Math.random() > 0.3 ? "MCQ" : "DESCRIPTIVE";
            
            const question = {
              category,
              subcategory,
              type,
              difficulty,
              experienceLevel: expLevel,
              question: `Sample ${category} question ${idCounter} about ${subcategory} - ${difficulty} level`,
              ...(type === "MCQ" ? {
                options: [
                  { id: "a", text: "Option A" },
                  { id: "b", text: "Option B" },
                  { id: "c", text: "Option C" },
                  { id: "d", text: "Option D" }
                ],
                correctAnswer: ["a", "b", "c", "d"][Math.floor(Math.random() * 4)]
              } : {
                correctAnswer: "Sample answer for descriptive question"
              }),
              explanation: `Detailed explanation for ${category} ${subcategory} concept. This covers important aspects that embedded engineers should understand.`,
              tags: [category, subcategory, difficulty, expLevel.replace(/\s+/g, '')],
              source: "EmbedPrep Generated"
            };

            additionalQuestions.push(question);
            idCounter++;
          }
        });
      });
    });
  });

  return additionalQuestions;
};

// Seed function
const seedDatabase = async () => {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing questions
    console.log('🗑️  Clearing existing questions...');
    await Question.deleteMany({});
    console.log('✅ Cleared existing questions');

    // Combine sample, real, and generated questions
    const generatedQuestions = generateMoreQuestions();
    const allQuestions = [...sampleQuestions, ...realQuestions, ...generatedQuestions].slice(0, 1000);

    console.log(`📝 Inserting ${allQuestions.length} questions...`);
    
    // Insert in batches to avoid overwhelming the database
    const batchSize = 100;
    for (let i = 0; i < allQuestions.length; i += batchSize) {
      const batch = allQuestions.slice(i, i + batchSize);
      await Question.insertMany(batch);
      console.log(`  Inserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(allQuestions.length / batchSize)}`);
    }

    console.log('✅ Seeding completed successfully!');

    // Display statistics
    const stats = await Question.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    console.log('\n📊 Question Distribution by Category:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    stats.forEach(stat => {
      console.log(`  ${stat._id.padEnd(30)} ${stat.count.toString().padStart(4)} questions`);
    });
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`  Total: ${await Question.countDocuments()} questions\n`);

  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('👋 Database connection closed');
    process.exit(0);
  }
};

// Run seeding
seedDatabase();
