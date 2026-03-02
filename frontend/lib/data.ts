import type { Question, Category, Stats } from '@/types';

// All questions embedded directly in the frontend for static site
const rawQuestions = [
  // C Programming
  {
    category: "C Programming",
    subcategory: "Memory Management",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "What will happen if you call free() on a pointer that was not allocated by malloc/calloc/realloc?",
    options: [
      { id: "a", text: "Compilation error" },
      { id: "b", text: "Undefined behavior/Segmentation fault" },
      { id: "c", text: "Memory leak" },
      { id: "d", text: "Nothing, it will work fine" }
    ],
    correctAnswer: "b",
    explanation: "Calling free() on a pointer not allocated by malloc family results in undefined behavior. It may crash with segmentation fault or corrupt memory heap.",
    tags: ["C", "malloc", "free", "Memory"],
    source: "Qualcomm Interview"
  },
  {
    category: "C Programming",
    subcategory: "Pointers",
    type: "MCQ",
    difficulty: "Hard",
    experienceLevel: "3-5 Years",
    question: "What is the output: int *p = NULL; printf(\"%d\", *p);",
    options: [
      { id: "a", text: "0" },
      { id: "b", text: "NULL" },
      { id: "c", text: "Segmentation fault" },
      { id: "d", text: "Compiler error" }
    ],
    correctAnswer: "c",
    explanation: "Dereferencing a NULL pointer causes segmentation fault (access violation) because NULL (0x0) is not a valid memory address.",
    tags: ["C", "NULL", "Pointers", "Segmentation Fault"],
    source: "Intel Interview"
  },
  {
    category: "C Programming",
    subcategory: "Storage Classes",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "What is the default storage class for local variables in C?",
    options: [
      { id: "a", text: "extern" },
      { id: "b", text: "static" },
      { id: "c", text: "auto" },
      { id: "d", text: "register" }
    ],
    correctAnswer: "c",
    explanation: "The default storage class for local variables is 'auto'. It means automatic storage duration - created when block is entered and destroyed when exited.",
    tags: ["C", "Storage Class", "auto", "Variables"],
    source: "NXP Semiconductors"
  },
  {
    category: "C Programming",
    subcategory: "Volatile",
    type: "DESCRIPTIVE",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "What is the purpose of 'volatile' keyword in embedded C? Give a practical example.",
    correctAnswer: "The 'volatile' keyword tells the compiler that a variable's value may change at any time without any action being taken by the code. It prevents compiler optimization on that variable.",
    explanation: "Example use cases: 1) Hardware registers mapped to memory (status registers, control registers) 2) Variables modified by ISRs 3) Variables shared between multiple threads. Without volatile, compiler might optimize away reads/writes assuming value doesn't change.",
    tags: ["C", "volatile", "Embedded", "Compiler Optimization"],
    source: "Texas Instruments"
  },
  {
    category: "C Programming",
    subcategory: "Bitwise Operations",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "Which operation clears the 3rd bit of a number without affecting other bits?",
    codeSnippet: "uint8_t num = 0b10101111;\n// Clear bit 3 (0-indexed)",
    options: [
      { id: "a", text: "num &= ~(1 << 3);" },
      { id: "b", text: "num |= (1 << 3);" },
      { id: "c", text: "num ^= (1 << 3);" },
      { id: "d", text: "num = ~(1 << 3);" }
    ],
    correctAnswer: "a",
    explanation: "num &= ~(1 << 3) creates a mask with all 1s except bit 3 (0), then ANDs with num to clear only that bit while preserving others.",
    tags: ["C", "Bitwise", "Bit Manipulation", "Masking"],
    source: "STMicroelectronics"
  },
  {
    category: "C Programming",
    subcategory: "Function Pointers",
    type: "DESCRIPTIVE",
    difficulty: "Hard",
    experienceLevel: "3-5 Years",
    question: "Explain function pointers with an example of callback function usage in embedded systems.",
    correctAnswer: "Function pointers store addresses of functions and can be used to call functions indirectly. Syntax: return_type (*ptr_name)(parameters);",
    explanation: "In embedded systems, function pointers are used for: 1) Callbacks (ISR handlers, timer callbacks) 2) State machines (array of function pointers for states) 3) Driver interfaces (Vtables). Example: typedef void (*callback_t)(void); callback_t irq_handler = &timer_isr; irq_handler();",
    tags: ["C", "Function Pointers", "Callbacks", "ISR"],
    source: "Bosch"
  },
  {
    category: "C Programming",
    subcategory: "Operators",
    type: "MCQ",
    difficulty: "Easy",
    experienceLevel: "Fresher",
    question: "What is the difference between ++i and i++?",
    options: [
      { id: "a", text: "No difference" },
      { id: "b", text: "++i increments before use, i++ increments after use" },
      { id: "c", text: "i++ is faster" },
      { id: "d", text: "++i can only be used in loops" }
    ],
    correctAnswer: "b",
    explanation: "++i (pre-increment): increment first, then return value. i++ (post-increment): return value first, then increment. In standalone statements, same result. In expressions: int a = ++i; vs int a = i++; behave differently.",
    tags: ["C", "Operators", "Increment", "Basic"],
    source: "Common Interview"
  },
  
  // C++ Programming
  {
    category: "C++ Programming",
    subcategory: "OOP",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "What is the output? class A { public: A() { cout << \"A\"; } }; class B: public A { public: B() { cout << \"B\"; } }; int main() { B obj; }",
    options: [
      { id: "a", text: "B" },
      { id: "b", text: "AB" },
      { id: "c", text: "BA" },
      { id: "d", text: "Compilation error" }
    ],
    correctAnswer: "b",
    explanation: "Base class constructor is always called before derived class constructor. So A() prints first, then B() prints.",
    tags: ["C++", "Constructor", "Inheritance", "OOP"],
    source: "Qualcomm"
  },
  {
    category: "C++ Programming",
    subcategory: "Virtual Functions",
    type: "MCQ",
    difficulty: "Hard",
    experienceLevel: "3-5 Years",
    question: "What happens if a class has virtual functions but no virtual destructor?",
    options: [
      { id: "a", text: "Compilation error" },
      { id: "b", text: "Memory leak when deleting derived object through base pointer" },
      { id: "c", text: "Runtime error" },
      { id: "d", text: "Nothing, it's safe" }
    ],
    correctAnswer: "b",
    explanation: "Without virtual destructor, deleting a derived class object through base class pointer causes undefined behavior. Only base destructor runs, derived destructor doesn't, causing resource leaks.",
    tags: ["C++", "Virtual Destructor", "Memory Leak", "Polymorphism"],
    source: "Intel"
  },
  {
    category: "C++ Programming",
    subcategory: "Templates",
    type: "DESCRIPTIVE",
    difficulty: "Hard",
    experienceLevel: "3-5 Years",
    question: "Explain the difference between template specialization and function overloading in C++.",
    correctAnswer: "Template specialization provides a custom implementation for specific types. Function overloading creates different functions with same name but different parameters.",
    explanation: "Template specialization is compile-time polymorphism for specific types (e.g., template<> class MyClass<int>). Overloading is multiple functions with same name. Specialization affects all uses of that type, while overloading requires exact match.",
    tags: ["C++", "Templates", "Specialization", "Overloading"],
    source: "NVIDIA"
  },

  // Communication Protocols
  {
    category: "Communication Protocols",
    subcategory: "I2C",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "Why are pull-up resistors required on I2C SDA and SCL lines?",
    options: [
      { id: "a", text: "To increase signal speed" },
      { id: "b", text: "I2C uses open-drain/open-collector outputs" },
      { id: "c", text: "For electrical isolation" },
      { id: "d", text: "To reduce power consumption" }
    ],
    correctAnswer: "b",
    explanation: "I2C uses open-drain/open-collector outputs which can only pull the line LOW. Pull-up resistors pull the line HIGH when no device is driving it low, enabling wired-AND functionality.",
    tags: ["I2C", "Pull-up", "Open-Drain", "Hardware"],
    source: "Texas Instruments"
  },
  {
    category: "Communication Protocols",
    subcategory: "SPI",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "What is the maximum number of slaves in SPI with individual chip selects?",
    options: [
      { id: "a", text: "8" },
      { id: "b", text: "16" },
      { id: "c", text: "Limited only by GPIO pins available" },
      { id: "d", text: "127" }
    ],
    correctAnswer: "c",
    explanation: "SPI with individual CS lines can support as many slaves as you have GPIO pins for chip selects. With daisy-chain, theoretically unlimited, but latency increases.",
    tags: ["SPI", "Slave", "Chip Select", "GPIO"],
    source: "Microchip"
  },
  {
    category: "Communication Protocols",
    subcategory: "CAN",
    type: "DESCRIPTIVE",
    difficulty: "Hard",
    experienceLevel: "3-5 Years",
    question: "Explain CAN bus arbitration process. What happens if two nodes transmit simultaneously?",
    correctAnswer: "CAN uses non-destructive bitwise arbitration. Lower ID wins. If two nodes transmit, they monitor the bus. If a node sees dominant (0) while transmitting recessive (1), it loses arbitration and stops.",
    explanation: "During arbitration, all transmitting nodes send their IDs. It's a wired-AND bus - dominant (0) overrides recessive (1). A transmitting node monitoring a dominant while sending recessive knows a higher priority message is being sent (lower ID). It stops transmitting and becomes a receiver.",
    tags: ["CAN", "Arbitration", "Automotive", "Bus"],
    source: "Bosch - CAN Spec Creator"
  },
  {
    category: "Communication Protocols",
    subcategory: "UART",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "UART communication requires which of the following to be same on both sides?",
    options: [
      { id: "a", text: "Only baud rate" },
      { id: "b", text: "Baud rate, data bits, stop bits, parity" },
      { id: "c", text: "Only voltage levels" },
      { id: "d", text: "Clock signal" }
    ],
    correctAnswer: "b",
    explanation: "UART is asynchronous. Both sides must agree on baud rate, data bits (usually 8), stop bits (1 or 2), and parity (none/even/odd) to properly decode the bit stream.",
    tags: ["UART", "Baud Rate", "Serial", "Configuration"],
    source: "Maxim Integrated"
  },
  {
    category: "Communication Protocols",
    subcategory: "USB",
    type: "MCQ",
    difficulty: "Hard",
    experienceLevel: "3-5 Years",
    question: "USB 2.0 Full Speed signaling uses which encoding?",
    options: [
      { id: "a", text: "NRZ" },
      { id: "b", text: "Manchester" },
      { id: "c", text: "NRZI with bit stuffing" },
      { id: "d", text: "8b/10b" }
    ],
    correctAnswer: "c",
    explanation: "USB 2.0 uses NRZI (Non-Return to Zero Inverted) encoding with bit stuffing. 1 = no change, 0 = toggle. After 6 consecutive 1s, a 0 is stuffed to ensure transitions for clock recovery.",
    tags: ["USB", "NRZI", "Encoding", "Signaling"],
    source: "Cypress/Infineon"
  },

  // Embedded Systems
  {
    category: "Embedded Systems",
    subcategory: "Interrupts",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "What should be minimized in an Interrupt Service Routine (ISR)?",
    options: [
      { id: "a", text: "Variable declarations" },
      { id: "b", text: "Execution time" },
      { id: "c", text: "Comments" },
      { id: "d", text: "Use of pointers" }
    ],
    correctAnswer: "b",
    explanation: "ISRs should be kept short and fast to minimize interrupt latency for other interrupts. Long operations should be deferred to main loop using flags.",
    tags: ["ISR", "Interrupt", "Latency", "Real-time"],
    source: "NXP"
  },
  {
    category: "Embedded Systems",
    subcategory: "Watchdog",
    type: "DESCRIPTIVE",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "What is a watchdog timer and how does it improve system reliability?",
    correctAnswer: "A watchdog timer is a hardware timer that resets the system if not periodically 'kicked' by software within a timeout period.",
    explanation: "If software hangs or enters an infinite loop, it won't kick the watchdog, causing a system reset to recover. Implementation: Configure timeout, periodically reset counter in main loop. In RTOS, kick from idle task or separate watchdog task.",
    tags: ["Watchdog", "Reliability", "Reset", "Safety"],
    source: "Renesas"
  },
  {
    category: "Embedded Systems",
    subcategory: "DMA",
    type: "MCQ",
    difficulty: "Hard",
    experienceLevel: "3-5 Years",
    question: "What is the main advantage of DMA over CPU-controlled data transfer?",
    options: [
      { id: "a", text: "Lower power consumption" },
      { id: "b", text: "CPU can perform other tasks during transfer" },
      { id: "c", text: "Higher security" },
      { id: "d", text: "Simpler code" }
    ],
    correctAnswer: "b",
    explanation: "DMA (Direct Memory Access) allows peripherals to transfer data directly to/from memory without CPU intervention. CPU is free to execute other code or enter low-power mode during transfer.",
    tags: ["DMA", "Memory", "Performance", "CPU"],
    source: "STMicroelectronics"
  },
  {
    category: "Embedded Systems",
    subcategory: "Bootloader",
    type: "DESCRIPTIVE",
    difficulty: "Hard",
    experienceLevel: "3-5 Years",
    question: "Describe the boot process of a typical ARM Cortex-M microcontroller.",
    correctAnswer: "1) Reset vector fetched from address 0x00000004, 2) SP initialized from 0x00000000, 3) Boot code runs (system init, clock config), 4) C runtime initialized (.data, .bss), 5) main() called.",
    explanation: "After reset: 1) Hardware loads SP from vector table, 2) Jumps to Reset_Handler, 3) SystemInit() configures clocks, 4) __main() copies initialized data to RAM, zeroes BSS, 5) Calls constructors (C++), 6) Calls main(). Bootloader may run first to check for firmware updates.",
    tags: ["Boot", "ARM", "Cortex-M", "Startup"],
    source: "ARM"
  },

  // RTOS
  {
    category: "RTOS",
    subcategory: "Scheduling",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "In FreeRTOS, which scheduling algorithm is used by default?",
    options: [
      { id: "a", text: "Round Robin" },
      { id: "b", text: "Priority-based Preemptive" },
      { id: "c", text: "First Come First Serve" },
      { id: "d", text: "Earliest Deadline First" }
    ],
    correctAnswer: "b",
    explanation: "FreeRTOS uses priority-based preemptive scheduling by default. Highest priority ready task runs. Time slicing (round robin for same priority) is optional.",
    tags: ["FreeRTOS", "Scheduling", "Preemptive", "Priority"],
    source: "FreeRTOS Official"
  },
  {
    category: "RTOS",
    subcategory: "Synchronization",
    type: "MCQ",
    difficulty: "Hard",
    experienceLevel: "3-5 Years",
    question: "What is priority inheritance in RTOS and why is it needed?",
    options: [
      { id: "a", text: "Low priority task inherits high priority permanently" },
      { id: "b", text: "High priority task temporarily boosts low priority task holding its resource" },
      { id: "c", text: "Tasks share the same priority level" },
      { id: "d", text: "Scheduler gives equal time to all priorities" }
    ],
    correctAnswer: "b",
    explanation: "Priority inheritance temporarily raises the priority of a low-priority task holding a resource needed by high-priority task. This prevents medium-priority tasks from preempting the low-priority task (priority inversion scenario).",
    tags: ["RTOS", "Priority Inheritance", "Mutex", "Synchronization"],
    source: "Micrium/OS"
  },
  {
    category: "RTOS",
    subcategory: "Context Switch",
    type: "DESCRIPTIVE",
    difficulty: "Hard",
    experienceLevel: "3-5 Years",
    question: "What happens during a context switch in an RTOS? What registers are typically saved?",
    correctAnswer: "Context switch saves the current task's context (registers, PC, SP) and restores the next task's context.",
    explanation: "Steps: 1) Save current context (R0-R12, LR, PC, xPSR, SP) to task stack, 2) Save SP to TCB, 3) Select next task, 4) Restore SP from new task's TCB, 5) Pop registers from stack, 6) Resume execution. On ARM Cortex-M: hardware saves R0-R3, R12, LR, PC, xPSR; software saves R4-R11.",
    tags: ["RTOS", "Context Switch", "Registers", "ARM"],
    source: "FreeRTOS/ARM"
  },

  // Microcontrollers
  {
    category: "Microcontrollers",
    subcategory: "STM32",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "STM32 HAL library function HAL_Delay() uses which timer?",
    options: [
      { id: "a", text: "TIM1" },
      { id: "b", text: "SysTick" },
      { id: "c", text: "TIM2" },
      { id: "d", text: "RTC" }
    ],
    correctAnswer: "b",
    explanation: "HAL_Delay() uses the SysTick timer (24-bit down-counter). SysTick is dedicated for RTOS tick or delay functions in Cortex-M processors.",
    tags: ["STM32", "HAL", "SysTick", "Timer"],
    source: "STMicroelectronics"
  },
  {
    category: "Microcontrollers",
    subcategory: "ARM",
    type: "MCQ",
    difficulty: "Hard",
    experienceLevel: "3-5 Years",
    question: "What is the difference between Cortex-M4 and Cortex-M3?",
    options: [
      { id: "a", text: "Only clock speed" },
      { id: "b", text: "M4 has FPU and DSP instructions" },
      { id: "c", text: "M3 has more memory" },
      { id: "d", text: "Only power consumption" }
    ],
    correctAnswer: "b",
    explanation: "Cortex-M4 adds: 1) Single-precision FPU (optional), 2) DSP instructions (SIMD, MAC), 3) Improved debug features. M3 is integer-only. Both use ARMv7-M architecture.",
    tags: ["ARM", "Cortex-M4", "Cortex-M3", "FPU", "DSP"],
    source: "ARM"
  },
  {
    category: "Microcontrollers",
    subcategory: "ESP32",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "ESP32 dual-core processor is based on which architecture?",
    options: [
      { id: "a", text: "ARM Cortex-M" },
      { id: "b", text: "Xtensa LX6" },
      { id: "c", text: "RISC-V" },
      { id: "d", text: "AVR" }
    ],
    correctAnswer: "b",
    explanation: "ESP32 uses Tensilica Xtensa LX6 microprocessor (32-bit). ESP32-S2/S3 use LX7. ESP32-C series uses RISC-V.",
    tags: ["ESP32", "Xtensa", "Architecture", "Dual Core"],
    source: "Espressif"
  },

  // IoT
  {
    category: "IoT",
    subcategory: "Protocols",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "MQTT QoS level 1 guarantees:",
    options: [
      { id: "a", text: "At most once delivery" },
      { id: "b", text: "At least once delivery" },
      { id: "c", text: "Exactly once delivery" },
      { id: "d", text: "No guarantee" }
    ],
    correctAnswer: "b",
    explanation: "MQTT QoS 1 = At least once delivery. Message is delivered one or more times. PUBLISH/PUBACK handshake. QoS 0 = at most once, QoS 2 = exactly once.",
    tags: ["MQTT", "QoS", "IoT", "Messaging"],
    source: "HiveMQ/Eclipse"
  },
  {
    category: "IoT",
    subcategory: "Security",
    type: "DESCRIPTIVE",
    difficulty: "Hard",
    experienceLevel: "3-5 Years",
    question: "Explain how to securely update firmware Over-The-Air (OTA) for IoT devices.",
    correctAnswer: "Secure OTA requires: signed firmware, encrypted transmission, rollback capability, and verification before activation.",
    explanation: "Secure OTA steps: 1) Sign firmware with private key, 2) Verify signature with device public key, 3) Download over TLS, 4) Store in secondary partition, 5) Verify integrity (checksum/hash), 6) Mark as bootable, 7) Rollback on failure. Dual bank flash preferred for atomic updates.",
    tags: ["OTA", "Security", "Firmware Update", "IoT"],
    source: "AWS IoT"
  },

  // PCB & Hardware Design
  {
    category: "PCB & Hardware Design",
    subcategory: "Decoupling",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "Why place decoupling capacitors close to IC power pins?",
    options: [
      { id: "a", text: "To reduce EMI" },
      { id: "b", text: "Minimize inductance of PCB traces for high-frequency noise" },
      { id: "c", text: "Aesthetic reasons" },
      { id: "d", text: "Thermal management" }
    ],
    correctAnswer: "b",
    explanation: "Close placement minimizes trace inductance. At high frequencies, trace inductance dominates and capacitor becomes ineffective if too far. Place as close as possible to power/ground pins.",
    tags: ["PCB", "Decoupling", "Capacitor", "Layout"],
    source: "Texas Instruments"
  },
  {
    category: "PCB & Hardware Design",
    subcategory: "Signal Integrity",
    type: "DESCRIPTIVE",
    difficulty: "Hard",
    experienceLevel: "3-5 Years",
    question: "What is controlled impedance and when is it necessary?",
    correctAnswer: "Controlled impedance matches trace characteristic impedance (Z0) to driver output and receiver input impedance to prevent signal reflections.",
    explanation: "Impedance Z0 = sqrt(L/C). For high-speed signals (>50-100 MHz edge rates or >1 Gbps), traces act as transmission lines. Mismatch causes reflections, ringing, EMI. Common values: 50Ω single-ended, 100Ω differential (USB, Ethernet, DDR). Controlled by trace width, layer stackup, dielectric material.",
    tags: ["PCB", "Impedance", "Signal Integrity", "High Speed"],
    source: "Intel/Altera"
  },

  // Interview Questions
  {
    category: "Interview Questions",
    subcategory: "Product Companies",
    type: "DESCRIPTIVE",
    difficulty: "Hard",
    experienceLevel: "Product Companies",
    question: "Design a circular buffer (ring buffer) for UART communication. How to handle overflow?",
    correctAnswer: "Circular buffer uses head/tail pointers with wrap-around. Overflow: overwrite oldest (streaming) or reject new (critical data).",
    explanation: "Implementation: head = write index, tail = read index. Empty: head==tail. Full: (head+1)%size == tail. For UART RX: ISR writes to buffer, main loop reads. Overflow handling: 1) Overwrite oldest (audio streaming), 2) Drop new (telemetry), 3) Flow control (RTS/CTS). Thread-safe: disable interrupts during updates.",
    tags: ["Circular Buffer", "Ring Buffer", "UART", "Design"],
    source: "Google/Apple"
  },
  {
    category: "Interview Questions",
    subcategory: "Automotive",
    type: "DESCRIPTIVE",
    difficulty: "Hard",
    experienceLevel: "Automotive",
    question: "What is ASIL in automotive functional safety (ISO 26262)? Explain ASIL levels.",
    correctAnswer: "ASIL (Automotive Safety Integrity Level) classifies safety requirements. Levels: QM, ASIL A (lowest), ASIL B, ASIL C, ASIL D (highest).",
    explanation: "ASIL determined by Severity, Exposure, Controllability. ASIL D: highest rigor (steering, braking). Requires redundancy, FTA, FMEA, 100% code coverage. ASIL decomposition allows splitting requirements. QM: quality management only, no safety requirements.",
    tags: ["ASIL", "ISO 26262", "Functional Safety", "Automotive"],
    source: "Bosch/Continental"
  },
  {
    category: "Interview Questions",
    subcategory: "Debugging",
    type: "DESCRIPTIVE",
    difficulty: "Hard",
    experienceLevel: "3-5 Years",
    question: "How would you debug a hard fault exception on ARM Cortex-M?",
    correctAnswer: "Check CFSR, HFSR, BFAR, MMFAR registers. Common causes: null pointer, stack overflow, misaligned access, invalid instruction.",
    explanation: "Steps: 1) Implement HardFault_Handler, 2) Read CFSR (Configurable Fault Status Reg) - shows UFSR/BFSR/MMSR, 3) Check BFAR (bus fault address), 4) Check stacked LR for fault location, 5) Common causes: stack overflow (check SP), null pointer dereference, access to disabled clock peripheral, divide by zero.",
    tags: ["Hard Fault", "ARM", "Debugging", "Cortex-M"],
    source: "NXP/STMicroelectronics"
  },
  {
    category: "Interview Questions",
    subcategory: "Memory",
    type: "DESCRIPTIVE",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "What is memory fragmentation and how to avoid it in embedded systems?",
    correctAnswer: "Fragmentation: free memory split into small non-contiguous blocks. External fragmentation: enough total memory but no single block large enough.",
    explanation: "Avoidance strategies: 1) Static allocation (preferred in embedded), 2) Memory pools (fixed-size blocks), 3) Custom allocators, 4) Avoid frequent malloc/free, 5) Use stack where possible, 6) Defragmentation (compact) if using dynamic allocation. In critical systems, often ban dynamic allocation after init.",
    tags: ["Memory", "Fragmentation", "Embedded", "malloc"],
    source: "General Embedded"
  },

  // Additional C Programming Questions
  {
    category: "C Programming",
    subcategory: "Arrays",
    type: "MCQ",
    difficulty: "Easy",
    experienceLevel: "Fresher",
    question: "What is the size of int arr[10] on a 32-bit system?",
    options: [
      { id: "a", text: "10 bytes" },
      { id: "b", text: "20 bytes" },
      { id: "c", text: "40 bytes" },
      { id: "d", text: "Depends on compiler" }
    ],
    correctAnswer: "c",
    explanation: "On a 32-bit system, int is typically 4 bytes. So arr[10] = 10 * 4 = 40 bytes.",
    tags: ["C", "Arrays", "Sizeof", "Basic"],
    source: "Common Interview"
  },
  {
    category: "C Programming",
    subcategory: "Strings",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "What does strlen(\"Hello\\0World\") return?",
    options: [
      { id: "a", text: "11" },
      { id: "b", text: "5" },
      { id: "c", text: "10" },
      { id: "d", text: "6" }
    ],
    correctAnswer: "b",
    explanation: "strlen() counts until null terminator. The string \"Hello\\0World\" has 'Hello' followed by null terminator, so length is 5.",
    tags: ["C", "Strings", "strlen", "Null Terminator"],
    source: "Common Interview"
  },
  {
    category: "C Programming",
    subcategory: "Preprocessor",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "What is the purpose of #ifndef in header files?",
    options: [
      { id: "a", text: "To define a variable" },
      { id: "b", text: "To prevent multiple inclusions" },
      { id: "c", text: "To include a library" },
      { id: "d", text: "To create a loop" }
    ],
    correctAnswer: "b",
    explanation: "#ifndef (if not defined) with #define and #endif creates an include guard that prevents the header content from being processed multiple times if the header is included more than once.",
    tags: ["C", "Preprocessor", "Header Guards", "Include"],
    source: "Common Interview"
  },

  // Additional Embedded Questions
  {
    category: "Embedded Systems",
    subcategory: "GPIO",
    type: "MCQ",
    difficulty: "Easy",
    experienceLevel: "Fresher",
    question: "What does GPIO stand for?",
    options: [
      { id: "a", text: "General Purpose Input Output" },
      { id: "b", text: "General Programmed Internal Operation" },
      { id: "c", text: "Global Pin Input Output" },
      { id: "d", text: "General Peripheral Input Output" }
    ],
    correctAnswer: "a",
    explanation: "GPIO = General Purpose Input Output. These are pins that can be programmed to be either inputs or outputs for digital signals.",
    tags: ["GPIO", "Basic", "Hardware", "Pins"],
    source: "Common Interview"
  },
  {
    category: "Embedded Systems",
    subcategory: "Timers",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "What is the main difference between a timer and a counter in microcontrollers?",
    options: [
      { id: "a", text: "Timers are faster" },
      { id: "b", text: "Timer counts internal clock pulses, counter counts external events" },
      { id: "c", text: "Counters are 16-bit, timers are 8-bit" },
      { id: "d", text: "No difference" }
    ],
    correctAnswer: "b",
    explanation: "A timer increments based on the internal system clock (for time delays). A counter increments based on external events/signals (for counting pulses).",
    tags: ["Timer", "Counter", "Microcontroller", "Peripheral"],
    source: "Common Interview"
  },
  {
    category: "Embedded Systems",
    subcategory: "Memory",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "Which memory type retains data without power?",
    options: [
      { id: "a", text: "SRAM" },
      { id: "b", text: "DRAM" },
      { id: "c", text: "Flash" },
      { id: "d", text: "SDRAM" }
    ],
    correctAnswer: "c",
    explanation: "Flash memory is non-volatile - retains data without power. SRAM, DRAM, and SDRAM are volatile memories that lose data when power is removed.",
    tags: ["Memory", "Flash", "Non-volatile", "Storage"],
    source: "Common Interview"
  },

  // Additional Protocol Questions
  {
    category: "Communication Protocols",
    subcategory: "I2C",
    type: "MCQ",
    difficulty: "Easy",
    experienceLevel: "Fresher",
    question: "How many wires does I2C use?",
    options: [
      { id: "a", text: "1" },
      { id: "b", text: "2" },
      { id: "c", text: "3" },
      { id: "d", text: "4" }
    ],
    correctAnswer: "b",
    explanation: "I2C uses 2 wires: SDA (Serial Data) and SCL (Serial Clock). It's a half-duplex protocol.",
    tags: ["I2C", "Wires", "Basic", "Hardware"],
    source: "Common Interview"
  },
  {
    category: "Communication Protocols",
    subcategory: "SPI",
    type: "MCQ",
    difficulty: "Easy",
    experienceLevel: "Fresher",
    question: "How many wires does SPI typically use (excluding CS)?",
    options: [
      { id: "a", text: "2" },
      { id: "b", text: "3" },
      { id: "c", text: "4" },
      { id: "d", text: "1" }
    ],
    correctAnswer: "b",
    explanation: "SPI uses 4 wires total: MOSI (Master Out Slave In), MISO (Master In Slave Out), SCLK (Clock), and CS/SS (Chip Select). Excluding CS, it uses 3 wires for data and clock.",
    tags: ["SPI", "Wires", "Basic", "Hardware"],
    source: "Common Interview"
  },
  {
    category: "Communication Protocols",
    subcategory: "Modbus",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "Modbus RTU typically runs over which physical layer?",
    options: [
      { id: "a", text: "Ethernet" },
      { id: "b", text: "RS-485/RS-232" },
      { id: "c", text: "USB" },
      { id: "d", text: "CAN" }
    ],
    correctAnswer: "b",
    explanation: "Modbus RTU (Remote Terminal Unit) typically runs over serial communication like RS-485 or RS-232. Modbus TCP runs over Ethernet.",
    tags: ["Modbus", "RTU", "Serial", "Industrial"],
    source: "Industrial Protocol"
  },

  // Additional Interview Questions
  {
    category: "Interview Questions",
    subcategory: "Fresher",
    type: "MCQ",
    difficulty: "Easy",
    experienceLevel: "Fresher",
    question: "What is the value of x after: int x = 5/2;",
    options: [
      { id: "a", text: "2.5" },
      { id: "b", text: "2" },
      { id: "c", text: "3" },
      { id: "d", text: "Compile error" }
    ],
    correctAnswer: "b",
    explanation: "Integer division truncates the decimal part. 5/2 = 2.5 becomes 2 when stored in an integer.",
    tags: ["C", "Integer Division", "Basic", "Type Conversion"],
    source: "Common Interview"
  },
  {
    category: "Interview Questions",
    subcategory: "Fresher",
    type: "DESCRIPTIVE",
    difficulty: "Easy",
    experienceLevel: "Fresher",
    question: "Explain the difference between stack and heap memory.",
    correctAnswer: "Stack: Automatic memory for local variables, fast allocation, fixed size, LIFO order. Heap: Dynamic memory for runtime allocation, slower, larger size, manual management.",
    explanation: "Stack memory is managed automatically by the compiler for function calls, local variables. It's fast but limited in size. Heap memory is for dynamic allocation (malloc/new) - larger but slower, requires manual deallocation (free/delete).",
    tags: ["Memory", "Stack", "Heap", "Basic"],
    source: "Common Interview"
  },
  {
    category: "Interview Questions",
    subcategory: "1-3 Years",
    type: "DESCRIPTIVE",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "What is reentrancy in embedded systems? Why is it important for ISRs?",
    correctAnswer: "A function is reentrant if it can be safely interrupted and called again before the previous call completes. Important for ISRs which can interrupt any code.",
    explanation: "Reentrant functions don't use static/global variables or modify shared resources without protection. ISRs can interrupt main code, so any function called from ISR must be reentrant. Use local variables, avoid static data, disable interrupts when accessing shared data.",
    tags: ["Reentrancy", "ISR", "Thread Safety", "Embedded"],
    source: "Common Interview"
  },
  {
    category: "Interview Questions",
    subcategory: "3-5 Years",
    type: "DESCRIPTIVE",
    difficulty: "Hard",
    experienceLevel: "3-5 Years",
    question: "Explain the difference between big-endian and little-endian byte ordering.",
    correctAnswer: "Big-endian: Most significant byte at lowest address. Little-endian: Least significant byte at lowest address.",
    explanation: "For 0x12345678 at address 0x100: Big-endian stores 0x12 at 0x100, 0x34 at 0x101, etc. Little-endian stores 0x78 at 0x100, 0x56 at 0x101, etc. x86 is little-endian, network protocols are big-endian (network byte order).",
    tags: ["Endianness", "Memory", "Byte Order", "Architecture"],
    source: "Common Interview"
  },
  {
    category: "Interview Questions",
    subcategory: "5+ Years",
    type: "DESCRIPTIVE",
    difficulty: "Hard",
    experienceLevel: "5+ Years",
    question: "Describe the process of bringing up a new embedded board (board bring-up).",
    correctAnswer: "Board bring-up involves hardware verification, bootloader porting, and basic software validation to ensure the board is functional.",
    explanation: "Steps: 1) Power-on check (voltages, current), 2) JTAG/debugger connection, 3) Verify clock and reset signals, 4) Port/configure bootloader, 5) Initialize basic peripherals (UART for debug), 6) Test memory (RAM), 7) Validate other peripherals, 8) Boot Linux/RTOS if applicable. Use oscilloscope, logic analyzer for debugging.",
    tags: ["Board Bring-up", "Hardware", "Debugging", "Boot"],
    source: "Senior Interview"
  }
];

// Process questions to add IDs and metadata
export const questions: Question[] = rawQuestions.map((q, index) => ({
  ...q,
  _id: `q${index + 1}`,
  viewCount: Math.floor(Math.random() * 5000) + 100,
  createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date().toISOString(),
}));

// Get unique categories and subcategories
export const categories: Category[] = Array.from(
  new Set(questions.map(q => q.category))
).map(cat => ({
  name: cat,
  subcategories: Array.from(new Set(questions.filter(q => q.category === cat).map(q => q.subcategory)))
}));

// Stats
export const stats: Stats = {
  totalQuestions: questions.length,
  byCategory: categories.map(c => ({ _id: c.name, count: questions.filter(q => q.category === c.name).length })),
  byDifficulty: ['Easy', 'Medium', 'Hard'].map(d => ({ 
    _id: d, 
    count: questions.filter(q => q.difficulty === d).length 
  })),
  byExperience: Array.from(new Set(questions.map(q => q.experienceLevel))).map(e => ({
    _id: e,
    count: questions.filter(q => q.experienceLevel === e).length
  }))
};

// Filter and paginate questions
export interface FilterOptions {
  category?: string;
  subcategory?: string;
  difficulty?: string;
  experienceLevel?: string;
  type?: string;
  search?: string;
  tags?: string[];
  page?: number;
  limit?: number;
}

export function getFilteredQuestions(options: FilterOptions = {}) {
  const { 
    category, 
    subcategory, 
    difficulty, 
    experienceLevel, 
    type, 
    search,
    tags,
    page = 1, 
    limit = 20 
  } = options;

  let filtered = [...questions];

  if (category) {
    filtered = filtered.filter(q => q.category === category);
  }
  if (subcategory) {
    filtered = filtered.filter(q => q.subcategory === subcategory);
  }
  if (difficulty) {
    filtered = filtered.filter(q => q.difficulty === difficulty);
  }
  if (experienceLevel) {
    filtered = filtered.filter(q => q.experienceLevel === experienceLevel);
  }
  if (type) {
    filtered = filtered.filter(q => q.type === type);
  }
  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(q => 
      q.question.toLowerCase().includes(searchLower) ||
      q.tags.some(t => t.toLowerCase().includes(searchLower)) ||
      q.explanation.toLowerCase().includes(searchLower)
    );
  }
  if (tags && tags.length > 0) {
    filtered = filtered.filter(q => tags.some(t => q.tags.includes(t)));
  }

  // Sort by newest first
  filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const paginated = filtered.slice(startIndex, startIndex + limit);

  return {
    data: paginated,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems,
      itemsPerPage: limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  };
}

// Get question by ID
export function getQuestionById(id: string): Question | undefined {
  return questions.find(q => q._id === id);
}

// Get related questions
export function getRelatedQuestions(id: string, limit = 4): Question[] {
  const question = getQuestionById(id);
  if (!question) return [];

  return questions
    .filter(q => q._id !== id && q.category === question.category)
    .slice(0, limit);
}

// Get all tags
export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  questions.forEach(q => q.tags.forEach(t => tagSet.add(t)));
  return Array.from(tagSet).sort();
}
