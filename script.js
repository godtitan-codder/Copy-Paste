/* ── EXPERIMENTS DATA ────────────────────────────────────────────────────── */
const experiments = [
  {
    id:1, expNum:2, subLabel:"Pattern 1 / 4",
    title:"Left to Right LED Pattern",
    assignment:"Assignment 3: Bare Metal Programming — External LEDs",
    desc:"Shift a single active-high LED from PA0 to PA7 one step at a time using direct ODR register writes.",
    lang:"C",
    code: `#include "stm32f4xx.h"\n\nvoid delay(void){\n    for(volatile int i = 0; i < 1000000; i++);\n}\n\nint main(void){\n    RCC->AHB1ENR |= (1 << 0);          /* Enable GPIOA clock */\n\n    for(int i = 0; i < 8; i++){\n        GPIOA->MODER &= ~(3 << (i*2));\n        GPIOA->MODER |=  (1 << (i*2)); /* Output mode */\n        GPIOA->PUPDR &= ~(3 << (i*2)); /* No pull */\n    }\n\n    while(1){\n        for(int i = 0; i < 8; i++){\n            GPIOA->ODR = (1 << i);\n            delay();\n            GPIOA->ODR &= ~(1 << i);\n        }\n    }\n}`
  },
  {
    id:2, expNum:2, subLabel:"Pattern 2 / 4",
    title:"Right to Left LED Pattern",
    assignment:"Assignment 3: Bare Metal Programming — External LEDs",
    desc:"Shift a single active-high LED from PA7 to PA0 using a decrementing loop and direct ODR writes.",
    lang:"C",
    code: `#include "stm32f4xx.h"\n\nvoid delay(void){\n    for(volatile int i = 0; i < 1000000; i++);\n}\n\nint main(void){\n    RCC->AHB1ENR |= (1 << 0);\n\n    for(int i = 0; i < 8; i++){\n        GPIOA->MODER &= ~(3 << (i*2));\n        GPIOA->MODER |=  (1 << (i*2));\n        GPIOA->PUPDR &= ~(3 << (i*2));\n    }\n\n    while(1){\n        for(int i = 7; i >= 0; i--){\n            GPIOA->ODR = (1 << i);\n            delay();\n        }\n    }\n}`
  },
  {
    id:3, expNum:2, subLabel:"Pattern 3 / 4",
    title:"Alternate LED Pattern",
    assignment:"Assignment 3: Bare Metal Programming — External LEDs",
    desc:"Toggle even and odd LEDs alternately (0x55 vs 0xAA) to produce a chess-board blink effect.",
    lang:"C",
    code: `#include "stm32f4xx.h"\n\nvoid delay(void){\n    for(volatile int i = 0; i < 1000000; i++);\n}\n\nint main(void){\n    RCC->AHB1ENR |= (1 << 0);\n\n    for(int i = 0; i < 8; i++){\n        GPIOA->MODER &= ~(3 << (i*2));\n        GPIOA->MODER |=  (1 << (i*2));\n        GPIOA->PUPDR &= ~(3 << (i*2));\n    }\n\n    while(1){\n        GPIOA->ODR = 0x55;  /* 0101 0101 */\n        delay();\n        GPIOA->ODR = 0xAA;  /* 1010 1010 */\n        delay();\n    }\n}`
  },
  {
    id:4, expNum:2, subLabel:"Pattern 4 / 4",
    title:"Curtain LED Pattern",
    assignment:"Assignment 3: Bare Metal Programming — External LEDs",
    desc:"LEDs close inward from both ends simultaneously (PA0+PA7, PA1+PA6 ...) like a closing curtain.",
    lang:"C",
    code: `#include "stm32f4xx.h"\n\nvoid delay(void){\n    for(volatile int i = 0; i < 1000000; i++);\n}\n\nint main(void){\n    RCC->AHB1ENR |= (1 << 0);\n\n    for(int i = 0; i < 8; i++){\n        GPIOA->MODER &= ~(3 << (i*2));\n        GPIOA->MODER |=  (1 << (i*2));\n        GPIOA->PUPDR &= ~(3 << (i*2));\n    }\n\n    while(1){\n        for(int i = 0; i < 4; i++){\n            GPIOA->ODR = (1 << i) | (1 << (7 - i));\n            delay();\n        }\n    }\n}`
  },
  {
    id:5, expNum:3,
    title:"USART2 Receive & Transmit — Echo Program",
    assignment:"Assignment 4: USART Communication — Echo Program",
    desc:"Configure USART2 at 9600 baud (8 MHz HSE). Every byte received on PA3 (RX) is echoed back on PA2 (TX).",
    lang:"C",
    code: `#include "stm32f407xx.h"\n\nvoid SystemClock_8MHz(void);\nvoid USART2_Init(void);\nvoid USART2_SendChar(char c);\nchar USART2_ReceiveChar(void);\nvoid USART2_SendString(char *str);\n\nint main(void){\n    char rx;\n    SystemClock_8MHz();\n    USART2_Init();\n    USART2_SendString("USART @ 8MHz\\r\\n");\n    while (1){\n        rx = USART2_ReceiveChar();\n        USART2_SendChar(rx);\n    }\n}\n\nvoid SystemClock_8MHz(void){\n    RCC->CR |= RCC_CR_HSEON;\n    while (!(RCC->CR & RCC_CR_HSERDY));\n    RCC->CFGR &= ~RCC_CFGR_SW;\n    RCC->CFGR |=  RCC_CFGR_SW_HSE;\n    while ((RCC->CFGR & RCC_CFGR_SWS) != RCC_CFGR_SWS_HSE);\n}\n\nvoid USART2_Init(void){\n    RCC->AHB1ENR |= RCC_AHB1ENR_GPIOAEN;\n    RCC->APB1ENR |= RCC_APB1ENR_USART2EN;\n\n    GPIOA->MODER &= ~((3<<4)|(3<<6));\n    GPIOA->MODER |=  (2<<4)|(2<<6);     /* Alternate Function */\n    GPIOA->AFR[0] &= ~((0xF<<8)|(0xF<<12));\n    GPIOA->AFR[0] |=   (7<<8)|(7<<12);  /* AF7 = USART2 */\n\n    USART2->CR1 = 0; USART2->CR2 = 0; USART2->CR3 = 0;\n    USART2->BRR  = 0x0341;              /* 9600 baud @ 8 MHz */\n    USART2->CR1 |= USART_CR1_TE | USART_CR1_RE | USART_CR1_UE;\n}\n\nvoid USART2_SendChar(char c){\n    while (!(USART2->SR & USART_SR_TXE));\n    USART2->DR = c;\n}\n\nchar USART2_ReceiveChar(void){\n    while (!(USART2->SR & USART_SR_RXNE));\n    return USART2->DR;\n}\n\nvoid USART2_SendString(char *str){\n    while (*str) USART2_SendChar(*str++);\n}`
  },
  {
    id:6, expNum:4,
    title:"GPS Raw NMEA Data Reception (UART Echo)",
    assignment:"Experiment 4: GPS Reception — Extract Location Coordinates via STM32",
    desc:"Receive raw NMEA sentences from a GPS module on USART2 and echo every byte to a serial terminal for parsing.",
    lang:"C",
    code: `#include "stm32f407xx.h"\n\nvoid SystemClock_8MHz(void);\nvoid USART2_Init(void);\nvoid USART2_SendChar(char c);\nchar USART2_ReceiveChar(void);\nvoid USART2_SendString(char *str);\n\nint main(void){\n    char rx;\n    SystemClock_8MHz();\n    USART2_Init();\n    USART2_SendString("USART2 @8MHz\\r\\n");\n    while (1){\n        rx = USART2_ReceiveChar();  /* Read GPS byte */\n        USART2_SendChar(rx);        /* Echo to terminal */\n    }\n}\n\nvoid SystemClock_8MHz(void){\n    RCC->CR |= RCC_CR_HSEON;\n    while (!(RCC->CR & RCC_CR_HSERDY));\n    RCC->CFGR |= RCC_CFGR_SW_HSE;\n    while ((RCC->CFGR & RCC_CFGR_SWS) != RCC_CFGR_SWS_HSE);\n}\n\nvoid USART2_Init(void){\n    RCC->AHB1ENR |= RCC_AHB1ENR_GPIOAEN;\n    RCC->APB1ENR |= RCC_APB1ENR_USART2EN;\n    GPIOA->MODER |= (2<<4)|(2<<6);\n    GPIOA->AFR[0] |= (7<<8)|(7<<12);\n    USART2->BRR = 0x0341;\n    USART2->CR1 = USART_CR1_TE | USART_CR1_RE | USART_CR1_UE;\n}\n\nvoid USART2_SendChar(char c){\n    while (!(USART2->SR & USART_SR_TXE));\n    USART2->DR = c;\n}\n\nchar USART2_ReceiveChar(void){\n    while (!(USART2->SR & USART_SR_RXNE));\n    return USART2->DR;\n}\n\nvoid USART2_SendString(char *str){\n    while (*str) USART2_SendChar(*str++);\n}`
  },
  {
    id:7, expNum:5,
    title:"GLCD Interfacing — Display Pattern",
    assignment:"Assignment 5: Interfacing GLCD with STM32 Processor",
    desc:"Drive a 128x64 GLCD via GPIOD (8-bit data bus) and GPIOC (RS/RW/EN/CS1/CS2/RST control lines).",
    lang:"C",
    code: `#include "stm32f407xx.h"\n\n#define RS  0\n#define RW  1\n#define EN  2\n#define CS1 3\n#define CS2 4\n#define RST 5\n\nvoid delay(void){\n    for(volatile int i = 0; i < 5000; i++);\n}\n\nvoid GLCD_GPIO_Init(void){\n    RCC->AHB1ENR |= 0x0C;         /* Enable GPIOC and GPIOD */\n\n    for(int i = 0; i < 8; i++){\n        GPIOD->MODER &= ~(3 << (i*2));\n        GPIOD->MODER |=  (1 << (i*2));\n    }\n    for(int i = 0; i <= 5; i++){\n        GPIOC->MODER &= ~(3 << (i*2));\n        GPIOC->MODER |=  (1 << (i*2));\n    }\n}\n\nvoid GLCD_Enable(void){\n    GPIOC->ODR |=  (1 << EN);\n    delay();\n    GPIOC->ODR &= ~(1 << EN);\n    delay();\n}\n\nvoid GLCD_Command(unsigned char cmd){\n    GPIOD->ODR  = cmd;\n    GPIOC->ODR &= ~(1 << RS);\n    GLCD_Enable();\n}\n\nvoid GLCD_Data(unsigned char data){\n    GPIOD->ODR  = data;\n    GPIOC->ODR |=  (1 << RS);\n    GLCD_Enable();\n}\n\nint main(void){\n    GLCD_GPIO_Init();\n    GLCD_Command(0x3F);\n    GLCD_Command(0xC0);\n    while(1){}\n}`
  },
  {
    id:8, expNum:6, subLabel:"Waveform 1 / 2",
    title:"Square Waveform Generation via DAC",
    assignment:"Assignment 6: Generate Waveforms Using DAC on STM32",
    desc:"Output a square wave on DAC Channel 1 (PA4) by alternating between full-scale (4095) and 0.",
    lang:"C",
    code: `#include "stm32f4xx.h"\n\nvoid delay(void){\n    for(int i = 0; i < 1000; i++);\n}\n\nvoid DAC_init(void){\n    RCC->AHB1ENR |= (1 << 0);\n    GPIOA->MODER |=  (3 << 8);\n    RCC->APB1ENR |= (1 << 29);\n    DAC->CR      |= (1 << 0);\n}\n\nint main(void){\n    DAC_init();\n    while(1){\n        DAC->DHR12R1 = 4095;\n        delay();\n        DAC->DHR12R1 = 0;\n        delay();\n    }\n}`
  },
  {
    id:9, expNum:6, subLabel:"Waveform 2 / 2",
    title:"Triangular Waveform Generation via DAC",
    assignment:"Assignment 6: Generate Waveforms Using DAC on STM32",
    desc:"Ramp the 12-bit DAC output up and down in steps of 51, producing a triangular wave on PA4.",
    lang:"C",
    code: `#include "stm32f4xx.h"\n\nvoid delay(void){\n    for(int i = 0; i < 100; i++);\n}\n\nvoid DAC_init(void){\n    RCC->AHB1ENR |= (1 << 0);\n    GPIOA->MODER |=  (3 << 8);\n    RCC->APB1ENR |= (1 << 29);\n    DAC->CR      |= (1 << 0);\n}\n\nint main(void){\n    int val;\n    DAC_init();\n    while(1){\n        for(val = 0; val < 4095; val += 51){ DAC->DHR12R1 = val; delay(); }\n        for(val = 4095; val > 0; val -= 51){ DAC->DHR12R1 = val; delay(); }\n    }\n}`
  },
  {
    id:10, expNum:7,
    title:"GSM Module — Call & SMS Transmission",
    assignment:"Assignment 7: GSM Module Interfacing with STM32",
    desc:"Send AT commands over USART2 to make a voice call and transmit an SMS using a GSM module.",
    lang:"C",
    code: `#include "stm32f4xx.h"\n\nvoid UART2_SendChar(char c){\n    while(!(USART2->SR & (1<<7)));\n    USART2->DR = c;\n}\nvoid UART2_SendString(char *str){\n    while(*str) UART2_SendChar(*str++);\n}\nvoid delay_ms(int ms){\n    for(int i = 0; i < ms*4000; i++);\n}\n\nint main(void){\n    delay_ms(3000);\n    UART2_SendString("AT\\r\\n");\n    delay_ms(2000);\n    UART2_SendString("ATD9876543210;\\r\\n");\n    delay_ms(15000);\n    UART2_SendString("ATH\\r\\n");\n    UART2_SendString("AT+CMGF=1\\r\\n");\n    delay_ms(1000);\n    UART2_SendString("AT+CMGS=\\"9876543210\\"\\r\\n");\n    delay_ms(1000);\n    UART2_SendString("Hello from STM32 GSM Module");\n    UART2_SendChar(26);\n    while(1);\n}`
  },
  {
    id:11, expNum:8,
    title:"ADC Temperature Reading with LM35",
    assignment:"Experiment 8: ADC Interfacing — LM35 Temperature Sensor",
    desc:"Trigger a 12-bit conversion on ADC1, then convert raw value to Celsius using LM35 (10 mV/C).",
    lang:"C",
    code: `#include "stm32f4xx.h"\n#include <stdio.h>\n\nuint16_t ADC1_Read(void){\n    ADC1->CR2 |= (1<<30);\n    while(!(ADC1->SR & (1<<1)));\n    return ADC1->DR;\n}\n\nint main(void){\n    uint16_t adc_val, temp_x10;\n    while(1){\n        adc_val = ADC1_Read();\n        temp_x10 = (adc_val * 330) / 4095;\n    }\n}`
  },
  {
    id:12, expNum:9,
    title:"LED Blinking Using Timer",
    assignment:"Experiment 9: LED Blinking Using Timer on STM32F4",
    desc:"Toggle the onboard LED on PA5 with XOR in a loop. Extend with TIM2 for precise timing.",
    lang:"C",
    code: `#include "stm32f4xx.h"\n\nint main(void){\n    RCC->AHB1ENR |= (1 << 0);\n    GPIOA->MODER &= ~(3 << 10);\n    GPIOA->MODER |=  (1 << 10);\n    while(1){\n        GPIOA->ODR ^= (1 << 5);\n        for(volatile int i = 0; i < 500000; i++);\n    }\n}`
  },
  {
    id:13, expNum:10,
    title:"Bluetooth Module — Wireless LED Control",
    assignment:"Experiment 10: Bluetooth Module Interfacing with STM32",
    desc:"Receive '1' or '0' via HC-05 Bluetooth module to turn the PA5 onboard LED ON or OFF.",
    lang:"C",
    code: `#include "stm32f4xx.h"\n\nchar USART2_ReceiveChar(void){\n    while(!(USART2->SR & USART_SR_RXNE));\n    return (char)USART2->DR;\n}\n\nint main(void){\n    char data;\n    RCC->AHB1ENR |= (1 << 0);\n    GPIOA->MODER &= ~(3 << 10);\n    GPIOA->MODER |=  (1 << 10);\n    while(1){\n        data = USART2_ReceiveChar();\n        if(data == '1') GPIOA->ODR |= (1 << 5);\n        else if(data == '0') GPIOA->ODR &= ~(1 << 5);\n    }\n}`
  }
];

/* ── HELPERS ─────────────────────────────────────────────────────────────── */
function escHtml(s){
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function highlightC(code){
  const e = escHtml(code);
  return e
    .replace(/(\/\/[^\n]*)/g,'<span class=\'cm\'>$1</span>')
    .replace(/(\/\*[\s\S]*?\*\/)/g,'<span class=\'cm\'>$1</span>')
    .replace(/"([^"]*)"/g,'<span class=\'str\'>"$1"</span>')
    .replace(/\b(#include|#define|#ifndef|#endif|#ifdef)\b/g,'<span class=\'an\'>$1</span>')
    .replace(/\b(void|int|char|unsigned|volatile|static|return|while|for|if|else|uint16_t|uint8_t|uint32_t)\b/g,'<span class=\'kw\'>$1</span>')
    .replace(/\b(RCC|GPIOA|GPIOC|GPIOD|USART2|ADC1|DAC|TIM2)\b/g,'<span class=\'cl\'>$1</span>')
    .replace(/\b(0x[0-9A-Fa-f]+|\d+)\b/g,'<span class=\'num\'>$1</span>');
}

/* ── CARD FACTORY ────────────────────────────────────────────────────────── */
const grid       = document.getElementById('experimentsGrid');
const noResults  = document.getElementById('noResults');
const noQuery    = document.getElementById('noResultsQuery');
const countEl    = document.getElementById('resultCount');

function createCard(exp, delayMs){
  const card = document.createElement('article');
  card.className = 'exp-card';
  card.style.animationDelay = delayMs + 'ms';

  const subBadge = exp.subLabel ? `<span class="sub-label">${exp.subLabel}</span>` : '';

  card.innerHTML = `
    <div class="card-header">
      <div class="card-meta">
        <div class="exp-badge"><span class="dot"></span>EXP ${String(exp.expNum).padStart(2,'0')}${subBadge}</div>
        <div class="card-assignment">${escHtml(exp.assignment)}</div>
        <div class="card-title">${escHtml(exp.title)}</div>
        <div class="card-desc">${escHtml(exp.desc)}</div>
      </div>
      <button class="copy-btn" aria-label="Copy code">
        <i class="fa-regular fa-copy"></i>
        <span class="btn-label">Copy</span>
      </button>
    </div>
    <div class="code-wrapper">
      <span class="code-lang-tag">${exp.lang}</span>
      <pre class="code-block">${highlightC(exp.code)}</pre>
    </div>`;

  const btn      = card.querySelector('.copy-btn');
  const codeEl   = card.querySelector('.code-block');
  const btnLabel = card.querySelector('.btn-label');
  const icon     = card.querySelector('i');

  btn.addEventListener('click', e => {
    const r = document.createElement('span');
    r.className = 'ripple';
    const rect = btn.getBoundingClientRect();
    const sz = Math.max(rect.width, rect.height);
    r.style.cssText = `width:${sz}px;height:${sz}px;left:${e.clientX-rect.left-sz/2}px;top:${e.clientY-rect.top-sz/2}px`;
    btn.appendChild(r);
    r.addEventListener('animationend', () => r.remove());

    navigator.clipboard.writeText(exp.code).then(() => {
      btn.classList.add('copied');
      icon.className = 'fa-solid fa-check';
      btnLabel.textContent = 'Copied!';
      codeEl.classList.add('flash');
      setTimeout(() => codeEl.classList.remove('flash'), 600);
      showToast('Code copied!', 'success');
      setTimeout(() => {
        btn.classList.remove('copied');
        icon.className = 'fa-regular fa-copy';
        btnLabel.textContent = 'Copy';
      }, 2000);
    });
  });

  return card;
}

function renderAll(list){
  grid.innerHTML = '';
  if(!list.length){
    noResults.hidden = false;
    countEl.textContent = '0 results';
    return;
  }
  noResults.hidden = true;
  countEl.textContent = `${list.length} experiment${list.length!==1?'s':''}`;
  list.forEach((exp, i) => grid.appendChild(createCard(exp, i * 45)));
}

const searchInput = document.getElementById('searchInput');
const searchClear = document.getElementById('searchClear');

searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  searchClear.classList.toggle('visible', q.length > 0);
  noQuery.textContent = searchInput.value.trim();
  if(!q){ renderAll(experiments); return; }
  renderAll(experiments.filter(e =>
    `exp${e.expNum} experiment${e.expNum} ${e.title} ${e.assignment} ${e.desc}`.toLowerCase().includes(q)
  ));
});

searchClear.addEventListener('click', () => {
  searchInput.value = '';
  searchClear.classList.remove('visible');
  renderAll(experiments);
  searchInput.focus();
});

const toastContainer = document.getElementById('toastContainer');
function showToast(msg, type='success'){
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  const ic = type==='success' ? 'fa-circle-check' : 'fa-circle-exclamation';
  t.innerHTML = `<i class="fa-solid ${ic} toast-icon"></i><span>${msg}</span>`;
  toastContainer.appendChild(t);
  setTimeout(() => {
    t.classList.add('hide');
    t.addEventListener('animationend', () => t.remove());
  }, 2200);
}

window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

renderAll(experiments);
