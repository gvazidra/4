### **Сопроводительная документация к проекту "Иллюстрация растровых алгоритмов"**

---

## **Содержание**
1. [Описание проекта](#описание-проекта)  
2. [Руководство для пользователя](#руководство-для-пользователя)  
3. [Руководство для программиста](#руководство-для-программиста)  
4. [Ссылка на сайт](#ссылка-на-сайт)

---

## **Описание проекта**

Проект представляет собой веб-приложение для **визуализации растровых алгоритмов**, используемых в компьютерной графике. На странице с помощью HTML5 Canvas демонстрируются следующие алгоритмы:

1. **Пошаговый алгоритм растеризации прямой**  
2. **Алгоритм ЦДА (Цифровой дифференциальный анализатор)**  
3. **Алгоритм Брезенхема (отрезок)**  
4. **Алгоритм Брезенхема (окружность)**  
5. **Алгоритм Кастеля-Питвея для кривой Безье**  

Приложение поддерживает **масштабирование** и **очистку сцены**, а также ввод координат для рисования объектов.

---

## **Руководство для пользователя**

### **1. Интерфейс**
- **Выбор алгоритма**:  
   В выпадающем списке выберите один из алгоритмов:
   - Пошаговый алгоритм  
   - Алгоритм ЦДА  
   - Алгоритм Брезенхема (отрезок)  
   - Алгоритм Брезенхема (окружность)  
   - Алгоритм Кастеля-Питвея (кривая Безье)  

- **Ввод координат**:
   - Поля **(x0, y0)** – начальные координаты.  
   - Поля **(x1, y1)** – конечные координаты или точка для радиуса.  

- **Кнопки управления**:
   - **"Нарисовать"**: запускает выбранный алгоритм и отображает результат на канвасе.  
   - **"Очистить"**: очищает канвас и сбрасывает сетку.  

- **Масштабирование**:
   - **"Увеличить"**: увеличивает масштаб канваса.  
   - **"Уменьшить"**: уменьшает масштаб канваса.  

### **2. Как работать с программой**
1. Выберите алгоритм из выпадающего списка.  
2. Введите координаты начальной и конечной точек.  
3. Нажмите **"Нарисовать"** для отображения результата.  
4. Используйте кнопки масштабирования для увеличения или уменьшения масштаба.  
5. Нажмите **"Очистить"** для удаления всех построений.  

---

## **Руководство для программиста**

### **1. Структура проекта**
Проект состоит из трёх файлов:
- **index.html** – HTML-разметка страницы.  
- **styles.css** – стилизация элементов.  
- **script.js** – основная логика построения растровых алгоритмов.  

---

### **2. Основные компоненты**

#### **2.1. HTML**
- Поля ввода координат и выпадающий список для выбора алгоритма.
- Кнопки управления для рисования, очистки и масштабирования.  
- Элемент **Canvas** для отрисовки графических объектов:
   ```html
   <canvas id="canvas" width="800" height="600"></canvas>
   ```

#### **2.2. Стилизация (CSS)**
Основные стили включают:
- Стили для кнопок и полей ввода.
- Контейнеры для элементов управления и канваса.
- Сетка фона канваса.

---

#### **2.3. JavaScript**
**Основные функции и их назначения:**

- **drawAxes()**:  
   Рисует оси координат и подписывает их на канвасе.

- **drawGrid()**:  
   Рисует сетку на основе текущего масштаба.

- **drawPixel(x, y)**:  
   Рисует "пиксель" на канвасе, учитывая масштаб и центр координат.

- **dda(x0, y0, x1, y1)**:  
   Реализует алгоритм **ЦДА** для рисования отрезка.

- **bresenhamLine(x0, y0, x1, y1)**:  
   Реализует **алгоритм Брезенхема** для построения отрезка.

- **bresenhamCircle(x0, y0, r)**:  
   Реализует **алгоритм Брезенхема** для построения окружности.

- **casteljau(points, t)** и **drawBezierCurve(points)**:  
   Реализуют алгоритм **Кастеля-Питвея** для рисования кривой Безье.

- **stepByStepLine(x0, y0, x1, y1)**:  
   Пошагово рисует отрезок с использованием задержки (анимация).

- **handleDraw()**:  
   Обрабатывает выбранный алгоритм и вызывает соответствующую функцию построения.

- **Масштабирование**:
   - `zoomIn()` и `zoomOut()` увеличивают и уменьшают масштаб.

---

### **3. Логика масштабирования**
Масштабирование происходит с помощью переменной `zoomLevel`, которая изменяет размер единичного пикселя на канвасе.  
Функция `drawGrid()` обновляет сетку и пересчитывает координаты для рисования пикселей.

---

### **4. Взаимодействие с интерфейсом**
- **События кнопок**:
   - `drawButton.addEventListener('click', handleDraw)` запускает рисование.  
   - `clearButton` вызывает функцию очистки канваса.  
   - Кнопки масштабирования изменяют `zoomLevel` и перерисовывают сетку.

- **Событие загрузки**:
   При загрузке страницы вызывается `drawGrid()` для отображения сетки и осей.

---

## **Ссылка на сайт**
https://gvazidra.github.io/lab4_pcg/

---
