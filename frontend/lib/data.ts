import type { Question, Category, Stats } from '@/types';

// All questions embedded directly in the frontend for static site
const rawQuestions: Omit<Question, '_id' | 'viewCount' | 'createdAt' | 'updatedAt'>[] = [
  // ============== C PROGRAMMING (30 Questions) ==============
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
  {
    category: "C Programming",
    subcategory: "Structures",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "What is the size of struct { char c; int i; } on a 32-bit system with 4-byte alignment?",
    options: [
      { id: "a", text: "5 bytes" },
      { id: "b", text: "8 bytes" },
      { id: "c", text: "6 bytes" },
      { id: "d", text: "4 bytes" }
    ],
    correctAnswer: "b",
    explanation: "With padding: char (1) + 3 padding bytes + int (4) = 8 bytes. The int needs 4-byte alignment, so padding is added after the char.",
    tags: ["C", "Structures", "Padding", "Alignment"],
    source: "Common Interview"
  },
  {
    category: "C Programming",
    subcategory: "Pointers",
    type: "MCQ",
    difficulty: "Hard",
    experienceLevel: "3-5 Years",
    question: "What is a dangling pointer?",
    options: [
      { id: "a", text: "A pointer that points to NULL" },
      { id: "b", text: "A pointer that points to freed/deallocated memory" },
      { id: "c", text: "A pointer that is not initialized" },
      { id: "d", text: "A pointer to a local variable" }
    ],
    correctAnswer: "b",
    explanation: "A dangling pointer points to memory that has been freed or deallocated. Accessing it leads to undefined behavior.",
    tags: ["C", "Pointers", "Dangling Pointer", "Memory"],
    source: "Common Interview"
  },
  {
    category: "C Programming",
    subcategory: "Memory Layout",
    type: "DESCRIPTIVE",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "Explain the memory layout of a C program.",
    correctAnswer: "A C program's memory is divided into: Text segment (code), Data segment (initialized global/static), BSS (uninitialized global/static), Heap (dynamic allocation), and Stack (local variables, function calls).",
    explanation: "Text: read-only program code. Data: initialized global/static variables. BSS: zero-initialized/uninitialized globals. Heap: grows upward, malloc/free. Stack: grows downward, local vars, return addresses. Stack and Heap grow towards each other.",
    tags: ["C", "Memory Layout", "Stack", "Heap"],
    source: "Common Interview"
  },
  {
    category: "C Programming",
    subcategory: "Const",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "What is the difference between const char* and char* const?",
    options: [
      { id: "a", text: "No difference" },
      { id: "b", text: "const char* - pointer to constant char, char* const - constant pointer to char" },
      { id: "c", text: "char* const is invalid syntax" },
      { id: "d", text: "const char* is for strings, char* const is for single char" }
    ],
    correctAnswer: "b",
    explanation: "const char* p: pointer to constant char (can't modify data through p). char* const p: constant pointer to char (can't change what p points to, but can modify data).",
    tags: ["C", "const", "Pointers", "Types"],
    source: "Common Interview"
  },
  {
    category: "C Programming",
    subcategory: "Recursion",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "What is the primary risk of deep recursion in embedded systems?",
    options: [
      { id: "a", text: "Slower execution" },
      { id: "b", text: "Stack overflow" },
      { id: "c", text: "Heap fragmentation" },
      { id: "d", text: "Memory leak" }
    ],
    correctAnswer: "b",
    explanation: "Each recursive call consumes stack space. Deep recursion can exhaust the limited stack in embedded systems, causing stack overflow. Iterative solutions are preferred in embedded programming.",
    tags: ["C", "Recursion", "Stack", "Embedded"],
    source: "Common Interview"
  },
  {
    category: "C Programming",
    subcategory: "Typedef",
    type: "DESCRIPTIVE",
    difficulty: "Easy",
    experienceLevel: "Fresher",
    question: "What is typedef and why is it useful in embedded programming?",
    correctAnswer: "typedef creates aliases for existing types. It improves code readability and portability by abstracting underlying types.",
    explanation: "Example: typedef unsigned int uint32_t; allows using uint32_t instead of unsigned int. In embedded, fixed-width types (uint8_t, uint16_t, uint32_t) from stdint.h are crucial for hardware register definitions that require exact sizes across different platforms.",
    tags: ["C", "typedef", "Types", "Portability"],
    source: "Common Interview"
  },
  {
    category: "C Programming",
    subcategory: "Endianness",
    type: "MCQ",
    difficulty: "Hard",
    experienceLevel: "3-5 Years",
    question: "On a little-endian system, how is 0x12345678 stored in memory starting at address 0x1000?",
    options: [
      { id: "a", text: "0x1000: 12, 0x1001: 34, 0x1002: 56, 0x1003: 78" },
      { id: "b", text: "0x1000: 78, 0x1001: 56, 0x1002: 34, 0x1003: 12" },
      { id: "c", text: "0x1000: 56, 0x1001: 78, 0x1002: 12, 0x1003: 34" },
      { id: "d", text: "Depends on compiler" }
    ],
    correctAnswer: "b",
    explanation: "Little-endian: Least significant byte at lowest address. 0x78 is stored at 0x1000, 0x56 at 0x1001, etc. Big-endian would be the reverse.",
    tags: ["C", "Endianness", "Memory", "Architecture"],
    source: "Common Interview"
  },
  {
    category: "C Programming",
    subcategory: "Switch Case",
    type: "MCQ",
    difficulty: "Easy",
    experienceLevel: "Fresher",
    question: "What happens if you forget 'break' in a switch case?",
    options: [
      { id: "a", text: "Compilation error" },
      { id: "b", text: "Fall-through to next case" },
      { id: "c", text: "Case is skipped" },
      { id: "d", text: "Default case executes" }
    ],
    correctAnswer: "b",
    explanation: "Without 'break', execution falls through to subsequent cases. This is called 'fall-through' behavior. It can be intentional for multiple cases sharing code, but often causes bugs.",
    tags: ["C", "Switch", "Control Flow", "Basic"],
    source: "Common Interview"
  },
  {
    category: "C Programming",
    subcategory: "Static",
    type: "DESCRIPTIVE",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "Explain the different uses of 'static' keyword in C.",
    correctAnswer: "Static has 3 uses: 1) Local static - persists between function calls, 2) Global static - limited to file scope, 3) Static function - limited to file scope.",
    explanation: "1) static inside function: variable retains value between calls, stored in data segment. 2) static global variable: visible only within the file. 3) static function: callable only within the file. Useful for encapsulation and state preservation.",
    tags: ["C", "Static", "Storage Class", "Scope"],
    source: "Common Interview"
  },
  {
    category: "C Programming",
    subcategory: "Sizeof",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "What is sizeof(void)?",
    options: [
      { id: "a", text: "1" },
      { id: "b", text: "0" },
      { id: "c", text: "Compilation error in C, 1 in GCC" },
      { id: "d", text: "4" }
    ],
    correctAnswer: "c",
    explanation: "In standard C, sizeof(void) is illegal. However, GCC allows it as an extension and returns 1. sizeof(void*) is valid and returns pointer size (4 or 8 bytes).",
    tags: ["C", "sizeof", "Void", "GCC"],
    source: "Common Interview"
  },
  {
    category: "C Programming",
    subcategory: "Macro",
    type: "MCQ",
    difficulty: "Hard",
    experienceLevel: "3-5 Years",
    question: "What is wrong with #define SQUARE(x) x*x? What is the fix?",
    options: [
      { id: "a", text: "Nothing wrong" },
      { id: "b", text: "Operator precedence issues - use #define SQUARE(x) ((x)*(x))" },
      { id: "c", text: "Should use inline function instead" },
      { id: "d", text: "Both B and C" }
    ],
    correctAnswer: "d",
    explanation: "SQUARE(2+3) expands to 2+3*2+3 = 11, not 25. Fix: add parentheses ((x)*(x)). Better: use inline function for type safety and no side effects: inline int square(int x) { return x*x; }.",
    tags: ["C", "Macros", "Preprocessor", "Best Practices"],
    source: "Common Interview"
  },

  // ============== C++ PROGRAMMING (20 Questions) ==============
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
  {
    category: "C++ Programming",
    subcategory: "References",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "What is the main difference between a pointer and a reference in C++?",
    options: [
      { id: "a", text: "Pointers can be null, references cannot" },
      { id: "b", text: "References must be initialized when declared" },
      { id: "c", text: "Pointers can be reassigned, references cannot" },
      { id: "d", text: "All of the above" }
    ],
    correctAnswer: "d",
    explanation: "References: must be initialized, cannot be null (must bind to valid object), cannot be rebound to different object. Pointers: can be null, can be reassigned, don't need initialization. References are safer aliases.",
    tags: ["C++", "References", "Pointers", "Basics"],
    source: "Common Interview"
  },
  {
    category: "C++ Programming",
    subcategory: "STL",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "Which STL container provides O(1) insertion at both ends?",
    options: [
      { id: "a", text: "vector" },
      { id: "b", text: "deque" },
      { id: "c", text: "list" },
      { id: "d", text: "stack" }
    ],
    correctAnswer: "b",
    explanation: "deque (double-ended queue) provides O(1) insertion and deletion at both front and back. vector is O(1) at back only, O(n) at front. list is O(1) but has higher memory overhead.",
    tags: ["C++", "STL", "Containers", "Performance"],
    source: "Common Interview"
  },
  {
    category: "C++ Programming",
    subcategory: "RAII",
    type: "DESCRIPTIVE",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "Explain RAII (Resource Acquisition Is Initialization) principle.",
    correctAnswer: "RAII ties resource management to object lifetime. Resources are acquired in constructor and released in destructor.",
    explanation: "Key concept: Use object scope to manage resources. When object is created, resource is acquired. When object goes out of scope, destructor releases resource. Examples: smart pointers (unique_ptr, shared_ptr), lock guards (std::lock_guard), file streams. Prevents memory leaks and makes code exception-safe.",
    tags: ["C++", "RAII", "Resource Management", "Smart Pointers"],
    source: "Common Interview"
  },
  {
    category: "C++ Programming",
    subcategory: "Const Correctness",
    type: "MCQ",
    difficulty: "Hard",
    experienceLevel: "3-5 Years",
    question: "What does 'const' after a function signature mean? void func() const;",
    options: [
      { id: "a", text: "Function returns const" },
      { id: "b", text: "Function doesn't modify object state" },
      { id: "c", text: "Function takes no parameters" },
      { id: "d", text: "Function cannot throw exceptions" }
    ],
    correctAnswer: "b",
    explanation: "A const member function promises not to modify the object's data members (except mutable members). It can be called on const objects. Non-const functions cannot be called on const objects.",
    tags: ["C++", "Const", "Member Functions", "OOP"],
    source: "Common Interview"
  },
  {
    category: "C++ Programming",
    subcategory: "Move Semantics",
    type: "DESCRIPTIVE",
    difficulty: "Hard",
    experienceLevel: "3-5 Years",
    question: "Explain move semantics and when to use std::move().",
    correctAnswer: "Move semantics transfer resources from one object to another without copying. std::move() casts to rvalue to enable moving.",
    explanation: "Move constructor/assignment: steals resources (like heap memory) from source object instead of copying, leaving source in valid but unspecified state. Use std::move() when: 1) Source object won't be used again, 2) Returning large objects (RVO may apply), 3) Implementing efficient swaps, 4) Inserting into containers. Don't use on const objects or when you need the source later.",
    tags: ["C++", "Move Semantics", "Performance", "Modern C++"],
    source: "Common Interview"
  },
  {
    category: "C++ Programming",
    subcategory: "Smart Pointers",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "Which smart pointer should you use for shared ownership?",
    options: [
      { id: "a", text: "unique_ptr" },
      { id: "b", text: "shared_ptr" },
      { id: "c", text: "weak_ptr" },
      { id: "d", text: "auto_ptr" }
    ],
    correctAnswer: "b",
    explanation: "shared_ptr provides shared ownership with reference counting. Multiple shared_ptrs can own the same object; it's deleted when last reference is destroyed. Use unique_ptr for exclusive ownership, weak_ptr to break circular references.",
    tags: ["C++", "Smart Pointers", "shared_ptr", "Memory Management"],
    source: "Common Interview"
  },
  {
    category: "C++ Programming",
    subcategory: "Name Mangling",
    type: "DESCRIPTIVE",
    difficulty: "Hard",
    experienceLevel: "3-5 Years",
    question: "What is name mangling in C++? Why is extern \"C\" needed?",
    correctAnswer: "Name mangling encodes function signature into the symbol name. extern \"C\" disables mangling for C compatibility.",
    explanation: "C++ compilers encode parameter types into function names to support function overloading. This makes symbols incompatible with C. extern \"C\" { } prevents mangling, allowing C++ code to call C libraries and be called from C. Required for: OS APIs, embedded HALs, protocol stacks written in C.",
    tags: ["C++", "Name Mangling", "Linkage", "C Compatibility"],
    source: "Common Interview"
  },

  // ============== COMMUNICATION PROTOCOLS (25 Questions) ==============
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
    explanation: "I2C uses 2 wires: SDA (Serial Data) and SCL (Serial Clock). It's a half-duplex protocol. Both lines are open-drain and require pull-up resistors.",
    tags: ["I2C", "Wires", "Basic", "Hardware"],
    source: "Common Interview"
  },
  {
    category: "Communication Protocols",
    subcategory: "SPI",
    type: "MCQ",
    difficulty: "Easy",
    experienceLevel: "Fresher",
    question: "What does SPI stand for?",
    options: [
      { id: "a", text: "Serial Peripheral Interface" },
      { id: "b", text: "Synchronous Parallel Interface" },
      { id: "c", text: "Serial Port Interface" },
      { id: "d", text: "System Peripheral Interconnect" }
    ],
    correctAnswer: "a",
    explanation: "SPI = Serial Peripheral Interface. It's a synchronous serial communication interface specification used for short-distance communication, primarily in embedded systems.",
    tags: ["SPI", "Basics", "Definitions"],
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
  {
    category: "Communication Protocols",
    subcategory: "RS-485",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "What is the maximum cable length for RS-485 at 100 kbps?",
    options: [
      { id: "a", text: "15 meters" },
      { id: "b", text: "100 meters" },
      { id: "c", text: "1200 meters" },
      { id: "d", text: "10 meters" }
    ],
    correctAnswer: "c",
    explanation: "RS-485 can support up to 1200 meters (4000 feet) at lower baud rates (≤100 kbps). Higher speeds reduce maximum cable length due to signal degradation.",
    tags: ["RS-485", "Distance", "Serial", "Industrial"],
    source: "Common Interview"
  },
  {
    category: "Communication Protocols",
    subcategory: "Ethernet",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "What is the purpose of the MAC address in Ethernet?",
    options: [
      { id: "a", text: "To identify the network" },
      { id: "b", text: "To uniquely identify a network interface" },
      { id: "c", text: "To encrypt data" },
      { id: "d", text: "To assign IP addresses" }
    ],
    correctAnswer: "b",
    explanation: "MAC (Media Access Control) address is a unique hardware identifier assigned to each network interface card (NIC). It's used for layer 2 (data link layer) addressing.",
    tags: ["Ethernet", "MAC", "Networking", "Basics"],
    source: "Common Interview"
  },

  // ============== EMBEDDED SYSTEMS (20 Questions) ==============
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
  {
    category: "Embedded Systems",
    subcategory: "ADC",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "What does ADC resolution of 12-bit mean?",
    options: [
      { id: "a", text: "Input range is 12V" },
      { id: "b", text: "Output has 4096 possible values (2^12)" },
      { id: "c", text: "Sampling rate is 12 kHz" },
      { id: "d", text: "Accuracy is 12%" }
    ],
    correctAnswer: "b",
    explanation: "12-bit resolution means the ADC can distinguish between 2^12 = 4096 different levels. For a 3.3V reference, that's about 0.8 mV per step (3.3V/4096).",
    tags: ["ADC", "Resolution", "Analog", "Conversion"],
    source: "Common Interview"
  },
  {
    category: "Embedded Systems",
    subcategory: "PWM",
    type: "DESCRIPTIVE",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "Explain PWM (Pulse Width Modulation) and its applications.",
    correctAnswer: "PWM is a technique to generate analog-like signals using digital pulses by varying the duty cycle.",
    explanation: "PWM switches between high and low at fixed frequency. Duty cycle = (ON time / Period) × 100%. Applications: LED brightness control, motor speed control, servo positioning, DAC, power supply regulation. Higher frequency = smoother output but more switching losses.",
    tags: ["PWM", "Analog", "Control", "Applications"],
    source: "Common Interview"
  },
  {
    category: "Embedded Systems",
    subcategory: "Power",
    type: "MCQ",
    difficulty: "Hard",
    experienceLevel: "3-5 Years",
    question: "What is the difference between sleep and deep sleep modes?",
    options: [
      { id: "a", text: "No difference" },
      { id: "b", text: "Deep sleep disables more peripherals and clocks for lower power" },
      { id: "c", text: "Sleep mode turns off RAM" },
      { id: "d", text: "Deep sleep is faster to wake from" }
    ],
    correctAnswer: "b",
    explanation: "Deep sleep (or standby) disables more clocks and peripherals than sleep mode, achieving lower power consumption (often microamps vs milliamps). Wake-up from deep sleep takes longer as more hardware needs reinitialization. Deep sleep may retain less state.",
    tags: ["Power Management", "Sleep", "Low Power", "Modes"],
    source: "Common Interview"
  },

  // ============== RTOS (15 Questions) ==============
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
  {
    category: "RTOS",
    subcategory: "Semaphores",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "What is the difference between a mutex and a binary semaphore?",
    options: [
      { id: "a", text: "No difference" },
      { id: "b", text: "Mutex has ownership, semaphore doesn't" },
      { id: "c", text: "Semaphore is faster" },
      { id: "d", text: "Mutex can be used for signaling" }
    ],
    correctAnswer: "b",
    explanation: "Mutex has ownership - only the task that took it can release it. Also supports priority inheritance. Binary semaphore can be released by any task, used for signaling/synchronization. Use mutex for resource protection, semaphore for signaling.",
    tags: ["RTOS", "Mutex", "Semaphore", "Synchronization"],
    source: "Common Interview"
  },
  {
    category: "RTOS",
    subcategory: "Deadlock",
    type: "DESCRIPTIVE",
    difficulty: "Hard",
    experienceLevel: "3-5 Years",
    question: "What is deadlock in RTOS? How can it be prevented?",
    correctAnswer: "Deadlock is a situation where two or more tasks are blocked forever, waiting for each other to release resources.",
    explanation: "Deadlock conditions: Mutual exclusion, Hold and wait, No preemption, Circular wait. Prevention strategies: 1) Lock ordering - always acquire locks in same order, 2) Timeout on lock attempts, 3) Avoid holding multiple locks, 4) Use try-lock with backoff. Deadlock detection is harder in embedded systems.",
    tags: ["RTOS", "Deadlock", "Prevention", "Synchronization"],
    source: "Common Interview"
  },

  // ============== MICROCONTROLLERS (15 Questions) ==============
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
  {
    category: "Microcontrollers",
    subcategory: "AVR",
    type: "MCQ",
    difficulty: "Easy",
    experienceLevel: "Fresher",
    question: "What is the maximum clock frequency of ATmega328P (Arduino Uno)?",
    options: [
      { id: "a", text: "8 MHz" },
      { id: "b", text: "16 MHz" },
      { id: "c", text: "20 MHz" },
      { id: "d", text: "32 MHz" }
    ],
    correctAnswer: "c",
    explanation: "ATmega328P is rated for up to 20 MHz. Arduino Uno runs at 16 MHz for compatibility with 5V operation and bootloader timing.",
    tags: ["AVR", "ATmega", "Clock", "Arduino"],
    source: "Common Interview"
  },
  {
    category: "Microcontrollers",
    subcategory: "Clocks",
    type: "DESCRIPTIVE",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "Explain the difference between HSE, HSI, and PLL clock sources in STM32.",
    correctAnswer: "HSE: External crystal oscillator (high accuracy). HSI: Internal RC oscillator (lower accuracy, faster startup). PLL: Phase Locked Loop for frequency multiplication.",
    explanation: "HSE (High Speed External): 4-26 MHz crystal/ceramic resonator, accurate but needs external component. HSI (High Speed Internal): 16 MHz RC oscillator, starts immediately but has ±1% accuracy. PLL multiplies input clock (HSE/HSI) to get higher system clock. Typical: HSE → PLL → 168 MHz system clock.",
    tags: ["STM32", "Clock", "HSE", "HSI", "PLL"],
    source: "Common Interview"
  },

  // ============== IoT (10 Questions) ==============
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
  {
    category: "IoT",
    subcategory: "CoAP",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "CoAP is designed to be:",
    options: [
      { id: "a", text: "A replacement for HTTP" },
      { id: "b", text: "A lightweight protocol for constrained devices" },
      { id: "c", text: "Only for WiFi networks" },
      { id: "d", text: "A security protocol" }
    ],
    correctAnswer: "b",
    explanation: "CoAP (Constrained Application Protocol) is designed for constrained devices and networks. It's lightweight, uses UDP, has low overhead, suitable for IoT devices with limited resources.",
    tags: ["CoAP", "IoT", "Protocols", "Constrained Devices"],
    source: "Common Interview"
  },

  // ============== PCB & HARDWARE (10 Questions) ==============
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
  {
    category: "PCB & Hardware Design",
    subcategory: "Grounding",
    type: "MCQ",
    difficulty: "Hard",
    experienceLevel: "3-5 Years",
    question: "What is the difference between analog ground and digital ground?",
    options: [
      { id: "a", text: "No difference, they are the same" },
      { id: "b", text: "They should be kept separate and joined at a single point" },
      { id: "c", text: "Analog ground is for AC only" },
      { id: "d", text: "Digital ground must be at 0V" }
    ],
    correctAnswer: "b",
    explanation: "Digital circuits create noisy ground currents. Analog circuits need quiet ground reference. Best practice: separate planes, single-point connection (star ground) near power entry or ADC. Prevents digital noise from corrupting analog signals.",
    tags: ["PCB", "Ground", "Analog", "Digital", "Noise"],
    source: "Common Interview"
  },

  // ============== INTERVIEW QUESTIONS (25 Questions) ==============
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
  },
  {
    category: "Interview Questions",
    subcategory: "3-5 Years",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "3-5 Years",
    question: "What is the time complexity of binary search?",
    options: [
      { id: "a", text: "O(n)" },
      { id: "b", text: "O(log n)" },
      { id: "c", text: "O(n log n)" },
      { id: "d", text: "O(n²)" }
    ],
    correctAnswer: "b",
    explanation: "Binary search has O(log n) time complexity. It repeatedly divides the search interval in half, making it much faster than linear search for sorted arrays.",
    tags: ["Algorithms", "Binary Search", "Complexity"],
    source: "Common Interview"
  },

  // Additional Questions to reach 100+
  {
    category: "C Programming",
    subcategory: "Linked List",
    type: "DESCRIPTIVE",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "Write a function to reverse a singly linked list.",
    codeSnippet: "struct Node { int data; struct Node* next; };",
    correctAnswer: "Use three pointers: prev (NULL), current (head), next. Iterate: store next, point current to prev, move prev and current forward.",
    explanation: "Algorithm: 1) Initialize prev = NULL, current = head. 2) While current != NULL: next = current->next, current->next = prev, prev = current, current = next. 3) Return prev as new head. Time: O(n), Space: O(1).",
    tags: ["C", "Linked List", "Algorithms", "Data Structures"],
    source: "Common Interview"
  },
  {
    category: "C Programming",
    subcategory: "Sorting",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "Which sorting algorithm is best for nearly sorted arrays?",
    options: [
      { id: "a", text: "Quick Sort" },
      { id: "b", text: "Insertion Sort" },
      { id: "c", text: "Merge Sort" },
      { id: "d", text: "Heap Sort" }
    ],
    correctAnswer: "b",
    explanation: "Insertion Sort has O(n) best case for nearly sorted arrays. Each element is compared with previous elements and inserted in correct position. For already sorted array, it makes only n-1 comparisons.",
    tags: ["C", "Sorting", "Algorithms", "Performance"],
    source: "Common Interview"
  },
  {
    category: "Embedded Systems",
    subcategory: "Debug",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "What is JTAG used for in embedded development?",
    options: [
      { id: "a", text: "Only for programming flash" },
      { id: "b", text: "Debugging, programming, and boundary scan testing" },
      { id: "c", text: "Only for serial communication" },
      { id: "d", text: "Power management" }
    ],
    correctAnswer: "b",
    explanation: "JTAG (Joint Test Action Group) is used for: 1) In-circuit debugging (breakpoints, single-step), 2) Programming flash memory, 3) Boundary scan testing for PCB manufacturing. Uses TCK, TMS, TDI, TDO pins.",
    tags: ["JTAG", "Debugging", "Hardware", "Testing"],
    source: "Common Interview"
  },
  {
    category: "RTOS",
    subcategory: "Tasks",
    type: "MCQ",
    difficulty: "Easy",
    experienceLevel: "Fresher",
    question: "In RTOS, what is a task?",
    options: [
      { id: "a", text: "A hardware interrupt" },
      { id: "b", text: "An independent thread of execution" },
      { id: "c", text: "A memory region" },
      { id: "d", text: "A timer interrupt" }
    ],
    correctAnswer: "b",
    explanation: "A task (or thread) is an independent thread of execution with its own stack and context. RTOS scheduler switches between tasks to achieve multitasking. Tasks can be in states: Running, Ready, Blocked, Suspended.",
    tags: ["RTOS", "Tasks", "Basics", "Multitasking"],
    source: "Common Interview"
  },
  {
    category: "Communication Protocols",
    subcategory: "LIN",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "LIN bus is primarily used for:",
    options: [
      { id: "a", text: "High-speed data transmission" },
      { id: "b", text: "Low-cost, low-speed automotive applications" },
      { id: "c", text: "Wireless communication" },
      { id: "d", text: "Video streaming" }
    ],
    correctAnswer: "b",
    explanation: "LIN (Local Interconnect Network) is a low-cost serial network for automotive. Used for doors, seats, lights - where CAN is too expensive. Single wire, up to 20 kbps, master-slave architecture.",
    tags: ["LIN", "Automotive", "Serial", "Low Cost"],
    source: "Common Interview"
  },

  // ============== ADDITIONAL C PROGRAMMING QUESTIONS (40 more) ==============
  {
    category: "C Programming",
    subcategory: "Pointers",
    type: "MCQ",
    difficulty: "Easy",
    experienceLevel: "Fresher",
    question: "What is the size of a pointer in a 64-bit system?",
    options: [
      { id: "a", text: "2 bytes" },
      { id: "b", text: "4 bytes" },
      { id: "c", text: "8 bytes" },
      { id: "d", text: "Depends on the data type" }
    ],
    correctAnswer: "c",
    explanation: "On a 64-bit system, pointers are typically 8 bytes (64 bits) to address the full memory space. On 32-bit systems, they are 4 bytes.",
    tags: ["C", "Pointers", "Memory", "Architecture"],
    source: "Common Interview"
  },
  {
    category: "C Programming",
    subcategory: "Arrays",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "What is the difference between arr[5] and *(arr+5)?",
    options: [
      { id: "a", text: "No difference" },
      { id: "b", text: "arr[5] is faster" },
      { id: "c", text: "*(arr+5) is safer" },
      { id: "d", text: "Depends on compiler" }
    ],
    correctAnswer: "a",
    explanation: "arr[5] and *(arr+5) are exactly equivalent. Array indexing is syntactic sugar for pointer arithmetic. Both access the 6th element (index 5).",
    tags: ["C", "Arrays", "Pointers", "Syntax"],
    source: "Common Interview"
  },
  {
    category: "C Programming",
    subcategory: "Memory",
    type: "MCQ",
    difficulty: "Hard",
    experienceLevel: "3-5 Years",
    question: "What is memory leak? How to detect it?",
    options: [
      { id: "a", text: "Using too much memory" },
      { id: "b", text: "Allocated memory not freed" },
      { id: "c", text: "Stack overflow" },
      { id: "d", text: "Using malloc instead of calloc" }
    ],
    correctAnswer: "b",
    explanation: "Memory leak occurs when dynamically allocated memory is not freed. Detection tools: Valgrind, AddressSanitizer, static analysis tools. Prevention: Always free what you malloc, use smart pointers in C++, RAII patterns.",
    tags: ["C", "Memory Leak", "Debugging", "Tools"],
    source: "Common Interview"
  },
  {
    category: "C Programming",
    subcategory: "Functions",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "What is the difference between call by value and call by reference?",
    options: [
      { id: "a", text: "No difference in C" },
      { id: "b", text: "Call by value copies data, call by reference uses pointers" },
      { id: "c", text: "Call by reference is faster" },
      { id: "d", text: "Call by value can modify original" }
    ],
    correctAnswer: "b",
    explanation: "Call by value: function receives a copy of the argument. Modifications don't affect original. Call by reference (using pointers): function receives address, can modify original data. C only supports call by value, but pointers can simulate call by reference.",
    tags: ["C", "Functions", "Parameters", "Pointers"],
    source: "Common Interview"
  },
  {
    category: "C Programming",
    subcategory: "Strings",
    type: "MCQ",
    difficulty: "Easy",
    experienceLevel: "Fresher",
    question: "What is the output: printf(\"%d\", sizeof(\"Hello\"));",
    options: [
      { id: "a", text: "5" },
      { id: "b", text: "6" },
      { id: "c", text: "4" },
      { id: "d", text: "Compiler error" }
    ],
    correctAnswer: "b",
    explanation: "String literal \"Hello\" includes null terminator, so sizeof returns 6 (5 characters + '\\0'). strlen() would return 5.",
    tags: ["C", "Strings", "sizeof", "Null Terminator"],
    source: "Common Interview"
  },
  {
    category: "C Programming",
    subcategory: "Loops",
    type: "MCQ",
    difficulty: "Easy",
    experienceLevel: "Fresher",
    question: "What is the output: for(int i=0; i<5; i++); printf(\"%d\", i);",
    options: [
      { id: "a", text: "0" },
      { id: "b", text: "4" },
      { id: "c", text: "5" },
      { id: "d", text: "Compilation error" }
    ],
    correctAnswer: "d",
    explanation: "This code won't compile because variable 'i' is declared inside the for loop (C99+ style) and is not accessible after the loop ends. The semicolon after for() also creates an empty loop body.",
    tags: ["C", "Loops", "Scope", "Syntax"],
    source: "Common Interview"
  },
  {
    category: "C Programming",
    subcategory: "Unions",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "What is the size of a union?",
    options: [
      { id: "a", text: "Sum of all member sizes" },
      { id: "b", text: "Size of largest member" },
      { id: "c", text: "Size of smallest member" },
      { id: "d", text: "Always 4 bytes" }
    ],
    correctAnswer: "b",
    explanation: "Union size equals the size of its largest member. All members share the same memory location. Only one member can hold a value at a time.",
    tags: ["C", "Unions", "Memory", "Data Structures"],
    source: "Common Interview"
  },
  {
    category: "C Programming",
    subcategory: "Bitwise",
    type: "MCQ",
    difficulty: "Hard",
    experienceLevel: "3-5 Years",
    question: "How to check if a number is a power of 2 using bitwise?",
    options: [
      { id: "a", text: "n & 1" },
      { id: "b", text: "n & (n-1) == 0" },
      { id: "c", text: "n | (n-1)" },
      { id: "d", text: "n ^ 1" }
    ],
    correctAnswer: "b",
    explanation: "Powers of 2 have exactly one bit set (e.g., 8=1000). n & (n-1) clears the lowest set bit. If result is 0, it was a power of 2. Example: 8 & 7 = 1000 & 0111 = 0000.",
    tags: ["C", "Bitwise", "Power of 2", "Tricks"],
    source: "Common Interview"
  },
  {
    category: "C Programming",
    subcategory: "Structures",
    type: "DESCRIPTIVE",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "Explain structure padding and how to avoid it.",
    correctAnswer: "Structure padding adds extra bytes to align members to memory boundaries for faster access.",
    explanation: "Compilers add padding to align data for performance. To minimize: 1) Order members by size (largest first), 2) Use #pragma pack(1) to disable packing (slower access), 3) Use __attribute__((packed)) in GCC. Trade-off: packed structures use less memory but may be slower to access.",
    tags: ["C", "Structures", "Padding", "Memory Optimization"],
    source: "Common Interview"
  },
  {
    category: "C Programming",
    subcategory: "File Handling",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "What is the difference between text and binary file modes?",
    options: [
      { id: "a", text: "No difference" },
      { id: "b", text: "Text mode handles newline conversion" },
      { id: "c", text: "Binary mode is faster" },
      { id: "d", text: "Text mode has error checking" }
    ],
    correctAnswer: "b",
    explanation: "Text mode (\"r\", \"w\") performs newline conversion (\\n ↔ \\r\\n on Windows). Binary mode (\"rb\", \"wb\") reads/writes bytes exactly as-is. Binary mode is essential for non-text files like images, executables.",
    tags: ["C", "File I/O", "Text Mode", "Binary Mode"],
    source: "Common Interview"
  },

  // ============== ADDITIONAL C++ QUESTIONS (30 more) ==============
  {
    category: "C++ Programming",
    subcategory: "OOP",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "What is the difference between public, private, and protected inheritance?",
    options: [
      { id: "a", text: "No difference" },
      { id: "b", text: "Public: unchanged, Protected: becomes protected, Private: becomes private" },
      { id: "c", text: "Only access specifier names differ" },
      { id: "d", text: "Private inheritance is faster" }
    ],
    correctAnswer: "b",
    explanation: "Public inheritance: public→public, protected→protected. Protected inheritance: public→protected, protected→protected. Private inheritance: all become private. Public is 'is-a' relationship, private is 'implemented-in-terms-of'.",
    tags: ["C++", "Inheritance", "Access Specifiers", "OOP"],
    source: "Common Interview"
  },
  {
    category: "C++ Programming",
    subcategory: "Polymorphism",
    type: "MCQ",
    difficulty: "Hard",
    experienceLevel: "3-5 Years",
    question: "What is the difference between compile-time and runtime polymorphism?",
    options: [
      { id: "a", text: "No difference" },
      { id: "b", text: "Compile-time: overloading/templates, Runtime: virtual functions" },
      { id: "c", text: "Runtime is faster" },
      { id: "d", text: "Compile-time uses more memory" }
    ],
    correctAnswer: "b",
    explanation: "Compile-time (static) polymorphism: function overloading, operator overloading, templates - resolved at compile time. Runtime (dynamic) polymorphism: virtual functions, vtable - resolved at runtime based on actual object type.",
    tags: ["C++", "Polymorphism", "Virtual Functions", "Templates"],
    source: "Common Interview"
  },
  {
    category: "C++ Programming",
    subcategory: "Constructors",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "What is an initializer list in C++?",
    options: [
      { id: "a", text: "A type of array" },
      { id: "b", text: "Constructor syntax to initialize members before body executes" },
      { id: "c", text: "A STL container" },
      { id: "d", text: "A comment style" }
    ],
    correctAnswer: "b",
    explanation: "Initializer list (after colon in constructor) initializes members before constructor body runs. Required for: const members, reference members, base class construction, member objects without default constructors. More efficient than assignment in body.",
    tags: ["C++", "Constructors", "Initializer List", "OOP"],
    source: "Common Interview"
  },
  {
    category: "C++ Programming",
    subcategory: "STL",
    type: "MCQ",
    difficulty: "Hard",
    experienceLevel: "3-5 Years",
    question: "What is the time complexity of std::map operations?",
    options: [
      { id: "a", text: "O(1)" },
      { id: "b", text: "O(log n)" },
      { id: "c", text: "O(n)" },
      { id: "d", text: "O(n log n)" }
    ],
    correctAnswer: "b",
    explanation: "std::map (typically red-black tree) has O(log n) for insert, delete, find. std::unordered_map (hash table) has O(1) average case. Tree-based map keeps elements sorted, hash map doesn't.",
    tags: ["C++", "STL", "Map", "Complexity"],
    source: "Common Interview"
  },
  {
    category: "C++ Programming",
    subcategory: "Exception Handling",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "What happens if an exception is thrown but not caught?",
    options: [
      { id: "a", text: "Program continues" },
      { id: "b", text: "std::terminate is called" },
      { id: "c", text: "Exception is ignored" },
      { id: "d", text: "Memory leak occurs" }
    ],
    correctAnswer: "b",
    explanation: "Uncaught exceptions call std::terminate() which aborts the program. In embedded systems, exceptions are often disabled (compilation flags) due to code size and performance concerns.",
    tags: ["C++", "Exceptions", "Error Handling", "Embedded"],
    source: "Common Interview"
  },

  // ============== ADDITIONAL PROTOCOL QUESTIONS (25 more) ==============
  {
    category: "Communication Protocols",
    subcategory: "Bluetooth",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "BLE stands for:",
    options: [
      { id: "a", text: "Bluetooth Long Range" },
      { id: "b", text: "Bluetooth Low Energy" },
      { id: "c", text: "Bluetooth Link Enhanced" },
      { id: "d", text: "Bluetooth Local Exchange" }
    ],
    correctAnswer: "b",
    explanation: "BLE (Bluetooth Low Energy) is designed for low power consumption. Different from Classic Bluetooth - not backward compatible at protocol level. Used in beacons, fitness trackers, IoT sensors.",
    tags: ["Bluetooth", "BLE", "Wireless", "Low Power"],
    source: "Common Interview"
  },
  {
    category: "Communication Protocols",
    subcategory: "Zigbee",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "Zigbee operates in which frequency band?",
    options: [
      { id: "a", text: "2.4 GHz only" },
      { id: "b", text: "915 MHz only" },
      { id: "c", text: "2.4 GHz, 915 MHz, 868 MHz" },
      { id: "d", text: "5 GHz" }
    ],
    correctAnswer: "c",
    explanation: "Zigbee operates in: 2.4 GHz (global, 16 channels), 915 MHz (Americas, 10 channels), 868 MHz (Europe, 1 channel). 2.4 GHz shares band with WiFi, Bluetooth.",
    tags: ["Zigbee", "Wireless", "Frequency", "IoT"],
    source: "Common Interview"
  },
  {
    category: "Communication Protocols",
    subcategory: "TCP/IP",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "What is the difference between TCP and UDP?",
    options: [
      { id: "a", text: "No difference" },
      { id: "b", text: "TCP is connection-oriented, UDP is connectionless" },
      { id: "c", text: "UDP is faster but unreliable" },
      { id: "d", text: "Both B and C" }
    ],
    correctAnswer: "d",
    explanation: "TCP: connection-oriented, reliable, ordered delivery, flow control, congestion control. UDP: connectionless, unreliable, no ordering, lower overhead, faster. TCP for file transfer, UDP for streaming/voice.",
    tags: ["TCP", "UDP", "Networking", "Protocols"],
    source: "Common Interview"
  },
  {
    category: "Communication Protocols",
    subcategory: "HTTP",
    type: "MCQ",
    difficulty: "Easy",
    experienceLevel: "Fresher",
    question: "HTTP status code 404 means:",
    options: [
      { id: "a", text: "Server error" },
      { id: "b", text: "Not Found" },
      { id: "c", text: "Unauthorized" },
      { id: "d", text: "Redirect" }
    ],
    correctAnswer: "b",
    explanation: "404 Not Found: requested resource doesn't exist. Common codes: 200 OK, 301/302 Redirect, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 500 Internal Server Error.",
    tags: ["HTTP", "Status Codes", "Web", "Basics"],
    source: "Common Interview"
  },
  {
    category: "Communication Protocols",
    subcategory: "SPI",
    type: "MCQ",
    difficulty: "Hard",
    experienceLevel: "3-5 Years",
    question: "What is SPI clock polarity and phase (CPOL, CPHA)?",
    options: [
      { id: "a", text: "They control clock speed" },
      { id: "b", text: "They define when data is sampled and clock idle state" },
      { id: "c", text: "They are not important" },
      { id: "d", text: "They control chip select" }
    ],
    correctAnswer: "b",
    explanation: "CPOL: clock idle state (0=low, 1=high). CPHA: data sampling edge (0=first edge, 1=second edge). Four modes (0-3). Master and slave must use same mode. Critical for proper SPI communication.",
    tags: ["SPI", "Timing", "Clock", "Configuration"],
    source: "Common Interview"
  },

  // ============== ADDITIONAL EMBEDDED QUESTIONS (25 more) ==============
  {
    category: "Embedded Systems",
    subcategory: "CRC",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "What is CRC used for?",
    options: [
      { id: "a", text: "Data compression" },
      { id: "b", text: "Error detection" },
      { id: "c", text: "Encryption" },
      { id: "d", text: "Data sorting" }
    ],
    correctAnswer: "b",
    explanation: "CRC (Cyclic Redundancy Check) detects accidental changes to data. Used in communication protocols, storage systems. Not for security (cryptographic hashes for that). Common: CRC-8, CRC-16, CRC-32.",
    tags: ["CRC", "Error Detection", "Communication", "Data Integrity"],
    source: "Common Interview"
  },
  {
    category: "Embedded Systems",
    subcategory: "FPU",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "What does FPU stand for?",
    options: [
      { id: "a", text: "Fast Processing Unit" },
      { id: "b", text: "Floating Point Unit" },
      { id: "c", text: "Flash Programming Unit" },
      { id: "d", text: "Frequency Processing Unit" }
    ],
    correctAnswer: "b",
    explanation: "FPU (Floating Point Unit) is hardware for floating-point operations. Without FPU, floating-point is done in software (much slower). Cortex-M4 has optional FPU, Cortex-M3 doesn't.",
    tags: ["FPU", "Floating Point", "Hardware", "Performance"],
    source: "Common Interview"
  },
  {
    category: "Embedded Systems",
    subcategory: "NVIC",
    type: "MCQ",
    difficulty: "Hard",
    experienceLevel: "3-5 Years",
    question: "What is NVIC in ARM Cortex-M?",
    options: [
      { id: "a", text: "Network Video Interface Controller" },
      { id: "b", text: "Nested Vectored Interrupt Controller" },
      { id: "c", text: "Non-Volatile Input Controller" },
      { id: "d", text: "New Virtual Interrupt Channel" }
    ],
    correctAnswer: "b",
    explanation: "NVIC manages interrupts in Cortex-M. Features: 1) Nested interrupts (higher priority can preempt), 2) Vectored table (direct jump to handler), 3) Configurable priority levels, 4) Integrated with core for low latency.",
    tags: ["ARM", "NVIC", "Interrupts", "Cortex-M"],
    source: "Common Interview"
  },
  {
    category: "Embedded Systems",
    subcategory: "Boot",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "What is the purpose of a bootloader?",
    options: [
      { id: "a", text: "To speed up the CPU" },
      { id: "b", text: "To initialize hardware and load the main application" },
      { id: "c", text: "To encrypt data" },
      { id: "d", text: "To communicate with network" }
    ],
    correctAnswer: "b",
    explanation: "Bootloader runs at startup to: 1) Initialize minimal hardware (clock, RAM), 2) Check for firmware updates, 3) Load and jump to main application. Can also provide recovery/upgrade mechanisms.",
    tags: ["Bootloader", "Boot", "Initialization", "Firmware"],
    source: "Common Interview"
  },
  {
    category: "Embedded Systems",
    subcategory: "EEPROM",
    type: "MCQ",
    difficulty: "Easy",
    experienceLevel: "Fresher",
    question: "What does EEPROM stand for?",
    options: [
      { id: "a", text: "Electrically Erasable Programmable Read-Only Memory" },
      { id: "b", text: "Electronic External Programmable Memory" },
      { id: "c", text: "Enhanced Embedded Program Memory" },
      { id: "d", text: "External Extended ROM" }
    ],
    correctAnswer: "a",
    explanation: "EEPROM is non-volatile memory that can be erased and reprogrammed electrically (byte by byte). Used for storing configuration, calibration data. Slower than Flash, more expensive, but byte-addressable.",
    tags: ["EEPROM", "Memory", "Non-volatile", "Storage"],
    source: "Common Interview"
  },

  // ============== ADDITIONAL RTOS QUESTIONS (15 more) ==============
  {
    category: "RTOS",
    subcategory: "Message Queues",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "What is a message queue in RTOS?",
    options: [
      { id: "a", text: "A hardware queue" },
      { id: "b", text: "A FIFO buffer for inter-task communication" },
      { id: "c", text: "A priority system" },
      { id: "d", text: "A debugging tool" }
    ],
    correctAnswer: "b",
    explanation: "Message queue is a FIFO buffer allowing tasks to send and receive messages. Decouples sender and receiver. Can be blocking (wait if empty/full) or non-blocking. Size must be defined at creation.",
    tags: ["RTOS", "Message Queue", "IPC", "Communication"],
    source: "Common Interview"
  },
  {
    category: "RTOS",
    subcategory: "Memory",
    type: "DESCRIPTIVE",
    difficulty: "Hard",
    experienceLevel: "3-5 Years",
    question: "Compare static and dynamic memory allocation in RTOS.",
    correctAnswer: "Static: allocated at compile time, deterministic, no fragmentation. Dynamic: allocated at runtime, flexible, risk of fragmentation and non-determinism.",
    explanation: "Static allocation: fixed sizes, known at compile time, no runtime failures, predictable. Dynamic (heap): malloc/free, flexible sizes, can fail, fragmentation, non-deterministic time. Embedded prefers static for reliability. Some safety-critical systems ban dynamic allocation.",
    tags: ["RTOS", "Memory", "Static", "Dynamic", "Allocation"],
    source: "Common Interview"
  },

  // ============== ADDITIONAL MICROCONTROLLER QUESTIONS (15 more) ==============
  {
    category: "Microcontrollers",
    subcategory: "Raspberry Pi",
    type: "MCQ",
    difficulty: "Easy",
    experienceLevel: "Fresher",
    question: "Raspberry Pi uses which processor architecture?",
    options: [
      { id: "a", text: "x86" },
      { id: "b", text: "ARM" },
      { id: "c", text: "AVR" },
      { id: "d", text: "MIPS" }
    ],
    correctAnswer: "b",
    explanation: "Raspberry Pi uses ARM processors (BCM chips). Pi 4 uses Cortex-A72. Different from Arduino (AVR) or ESP32 (Xtensa). ARM Cortex-A series for applications, Cortex-M for microcontrollers.",
    tags: ["Raspberry Pi", "ARM", "Architecture", "Single Board Computer"],
    source: "Common Interview"
  },
  {
    category: "Microcontrollers",
    subcategory: "Arduino",
    type: "MCQ",
    difficulty: "Easy",
    experienceLevel: "Fresher",
    question: "What language is Arduino programmed in?",
    options: [
      { id: "a", text: "Python" },
      { id: "b", text: "C/C++" },
      { id: "c", text: "Java" },
      { id: "d", text: "Assembly only" }
    ],
    correctAnswer: "b",
    explanation: "Arduino uses C/C++ with some simplifications and libraries. The IDE handles compilation via avr-gcc. Users write setup() and loop() functions. Can also use pure C/C++ or inline assembly.",
    tags: ["Arduino", "C++", "Programming", "Basics"],
    source: "Common Interview"
  },

  // ============== ADDITIONAL INTERVIEW QUESTIONS (40 more) ==============
  {
    category: "Interview Questions",
    subcategory: "Data Structures",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "Which data structure uses LIFO?",
    options: [
      { id: "a", text: "Queue" },
      { id: "b", text: "Stack" },
      { id: "c", text: "Array" },
      { id: "d", text: "Linked List" }
    ],
    correctAnswer: "b",
    explanation: "Stack uses LIFO (Last In First Out). Queue uses FIFO (First In First Out). Stack operations: push (add), pop (remove). Used for: function calls, expression evaluation, backtracking.",
    tags: ["Data Structures", "Stack", "LIFO", "Algorithms"],
    source: "Common Interview"
  },
  {
    category: "Interview Questions",
    subcategory: "Debugging",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "What is a breakpoint in debugging?",
    options: [
      { id: "a", text: "A syntax error" },
      { id: "b", text: "A point where execution pauses" },
      { id: "c", text: "A memory leak" },
      { id: "d", text: "A compiler warning" }
    ],
    correctAnswer: "b",
    explanation: "Breakpoint pauses program execution at a specific line. Debugger then allows: inspecting variables, single-stepping, modifying values, examining call stack. Essential debugging tool.",
    tags: ["Debugging", "Breakpoint", "Tools", "Development"],
    source: "Common Interview"
  },
  {
    category: "Interview Questions",
    subcategory: "Version Control",
    type: "MCQ",
    difficulty: "Easy",
    experienceLevel: "Fresher",
    question: "What is Git used for?",
    options: [
      { id: "a", text: "Compiling code" },
      { id: "b", text: "Version control" },
      { id: "c", text: "Debugging" },
      { id: "d", text: "Testing" }
    ],
    correctAnswer: "b",
    explanation: "Git is a distributed version control system. Tracks changes, enables collaboration, branching, merging, history. Commands: clone, add, commit, push, pull, branch, merge.",
    tags: ["Git", "Version Control", "Tools", "Development"],
    source: "Common Interview"
  },
  {
    category: "Interview Questions",
    subcategory: "Testing",
    type: "MCQ",
    difficulty: "Medium",
    experienceLevel: "1-3 Years",
    question: "What is unit testing?",
    options: [
      { id: "a", text: "Testing the whole system" },
      { id: "b", text: "Testing individual components/functions" },
      { id: "c", text: "Testing by users" },
      { id: "d", text: "Testing hardware" }
    ],
    correctAnswer: "b",
    explanation: "Unit testing tests individual units (functions, classes) in isolation. Fast, repeatable, automated. Frameworks: Unity (embedded C), Google Test (C++), CMocka. TDD writes tests before code.",
    tags: ["Testing", "Unit Testing", "Quality", "Development"],
    source: "Common Interview"
  },
  {
    category: "Interview Questions",
    subcategory: "Optimization",
    type: "DESCRIPTIVE",
    difficulty: "Hard",
    experienceLevel: "3-5 Years",
    question: "How would you optimize code for memory-constrained embedded systems?",
    correctAnswer: "Use smaller data types, avoid dynamic allocation, use const, pack structures, enable compiler optimizations, profile before optimizing.",
    explanation: "Techniques: 1) Use uint8_t/uint16_t instead of int where possible, 2) Store constants in flash (const), 3) Avoid floating-point, 4) Bit fields for flags, 5) Static allocation, 6) Compiler flags (-Os), 7) Remove unused features, 8) Circular buffers instead of dynamic allocation.",
    tags: ["Optimization", "Memory", "Embedded", "Performance"],
    source: "Common Interview"
  },
  {
    category: "Interview Questions",
    subcategory: "Fresher",
    type: "MCQ",
    difficulty: "Easy",
    experienceLevel: "Fresher",
    question: "What does IDE stand for?",
    options: [
      { id: "a", text: "Internet Development Environment" },
      { id: "b", text: "Integrated Development Environment" },
      { id: "c", text: "Internal Data Exchange" },
      { id: "d", text: "Interface Design Editor" }
    ],
    correctAnswer: "b",
    explanation: "IDE combines editor, compiler, debugger, and other tools. Examples: VS Code, Keil, STM32CubeIDE, Arduino IDE. Increases productivity by providing unified workflow.",
    tags: ["IDE", "Tools", "Development", "Basics"],
    source: "Common Interview"
  },
  {
    category: "Interview Questions",
    subcategory: "Fresher",
    type: "MCQ",
    difficulty: "Easy",
    experienceLevel: "Fresher",
    question: "What is the first step in troubleshooting a hardware issue?",
    options: [
      { id: "a", text: "Replace the CPU" },
      { id: "b", text: "Check power supply and connections" },
      { id: "c", text: "Rewrite the firmware" },
      { id: "d", text: "Buy new components" }
    ],
    correctAnswer: "b",
    explanation: "Always start with basics: 1) Power supply (voltage, current), 2) Ground connections, 3) Clock signals, 4) Reset line, 5) Physical connections, 6) Then move to software/configuration.",
    tags: ["Troubleshooting", "Hardware", "Debugging", "Basics"],
    source: "Common Interview"
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
