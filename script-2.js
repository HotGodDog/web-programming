
// 2.1
// kebab-case -> camelCase (по условию используем at, split, toUpperCase)
function kebabToCamel(str) {
    let parts = str.split('-');     // разбиваем по дефису
    let result = parts[0];          // первая часть без изменений
    for (let i = 1; i < parts.length; i++) {
        result += parts[i].at(0).toUpperCase() + parts[i].slice(1);
    }
    return result;
}
console.log("2.1:", kebabToCamel("background-color"));  // backgroundColor

// 2.2
let arr = [9, 8, 7, 6, 5, 4, 3, 2, 1];

// Копия 1: slice + reverse
let copy1 = arr.slice();
copy1.reverse();

// Копия 2: spread + sort (от большего к меньшему)
let copy2 = [...arr];
copy2.sort((a, b) => b - a);

console.log("2.2 исходный:", arr);
console.log("2.2 копия 1 (slice+reverse):", copy1);
console.log("2.2 копия 2 (spread+sort):", copy2);

// 2.3
function translate(str) {
    let dictionary = {
        "hello": "привет",
        "world": "мир",
        "good morning": "доброе утро",
        "thank you": "спасибо"
    };
    return dictionary[str.toLowerCase()] || "Перевод отсутствует";
}
console.log("2.3:", translate("hello"), "|", translate("thank you"), "|", translate("cat"));

// 2.4
let week = {
    1: "Понедельник",
    2: "Вторник",
    3: "Среда",
    4: "Четверг",
    5: "Пятница",
    6: "Суббота",
    7: "Воскресенье",
    getCurrentDay() {
        // JS: воскресенье = 0, поэтому приводим к 1..7
        let day = new Date().getDay();
        let num = day === 0 ? 7 : day;
        return this[num];
    }
};
console.log("2.4 сегодня:", week.getCurrentDay());

// 2.5
let personnel = {
    "Директор": "Иванов",
    "Бухгалтер": "Петрова",
    "Секретарь": "Сидорова"
};

let personnel2 = { ...personnel };      // копия объекта
personnel2["Директор"] = "Смирнов";     // меняем имя в копии
personnel2["Бухгалтер"] = "Кузнецова";

// вывод через \n
console.log("2.5 персонал 1:\n" + JSON.stringify(personnel, null, 2));
console.log("2.5 персонал 2:\n" + JSON.stringify(personnel2, null, 2));

// 2.6
let subjects = {
    list: "Математика, Физика, Информатика",
    addSubject(item) {
        let arr = this.list.split(", ");
        if (!arr.includes(item)) {
            arr.push(item);
            this.list = arr.join(", ");
            return `Добавлено: ${item}`;
        }
        return `${item} уже есть в списке`;
    },
    removeSubject(item) {
        let arr = this.list.split(", ");
        let index = arr.indexOf(item);
        if (index !== -1) {
            arr.splice(index, 1);       // удаляем 1 элемент по индексу
            this.list = arr.join(", ");
            return `Удалено: ${item}`;
        }
        return `${item} не найдено`;
    }
};

console.log("2.6 начало:", subjects.list);
console.log(subjects.addSubject("Химия"));
console.log(subjects.addSubject("Физика"));   // уже есть
console.log(subjects.removeSubject("Физика"));
console.log(subjects.removeSubject("История")); // нет
console.log("2.6 итог:", subjects.list);