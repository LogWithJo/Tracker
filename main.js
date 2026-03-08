// DOM

const HabitButton = document.getElementById("HabitButtonPage");
const TaskButton = document.getElementById("TaskButtonPage");
const HabitPage = document.getElementById("HabitPage");
const TaskPage = document.getElementById("TaskPage");
const AddTaskButton = document.getElementById("AddTaskButton");
const AddHabitButton = document.getElementById("AddHabitButton");
const Tasks = document.getElementById("Tasks");
const Habits = document.getElementById("Habits");
const EmptyTasks = document.getElementById("NoTasks");
const EmptyHabits = document.getElementById("NoHabits");
const ActiveTasks = document.getElementById("ActiveTasks");
const ActiveHabits = document.getElementById("ActiveHabits");
const TaskBtnBg = document.getElementById("TaskButtonBg");
const HabitBtnBg = document.getElementById("HabitButtonBg");

// Toggle Between The 2 Tabs

HabitButton.onclick = () => {
	TaskPage.classList.add("hidden");
	HabitPage.classList.remove("hidden");
	TaskBtnBg.classList.remove("bg-white");
	HabitBtnBg.classList.add("bg-white");
};
TaskButton.onclick = () => {
	TaskPage.classList.remove("hidden");
	HabitPage.classList.add("hidden");
	TaskBtnBg.classList.add("bg-white");
	HabitBtnBg.classList.remove("bg-white");
};

// Task List
const TaskList = [];

// Add Task

let Counter = 0;
AddTaskButton.onclick = () => {
	const NewTaskName = document.getElementById("TaskInput").value;
	const TaskCont = document.getElementById("TasksList");
	const TaskPriority = document.getElementById("Priority").value;
	const RepeatedTask = document.getElementById("RepeatedTaskStatement");
	let RepeatedBreak = false;
	if (NewTaskName === "" || NewTaskName === "_") return;
	TaskList.forEach((x) => {
		if (NewTaskName === x.TaskName) {
			console.log("There is already");
			RepeatedTask.classList.remove("hidden");
			setTimeout(() => {
				RepeatedTask.classList.add("hidden");
			}, 2000);
			RepeatedBreak = true;
		}
	});
	if (RepeatedBreak === true) {
		return "";
	}
	Counter++;
	TaskList.push({ TaskName: NewTaskName, Priority: TaskPriority, Id: Counter });
	const Task = document.createElement("div");
	let TaskColor = `bg-gray-400`;
	switch (TaskPriority) {
		case "Hard":
			TaskColor = `bg-red-600`;
			break;
		case "Easy":
			TaskColor = `bg-amber-300`;
			break;
		case "Medium":
			TaskColor = `bg-blue-500`;
			break;
	}
	Task.innerHTML = `<div id="Task${Counter}" class="w-full flex shadow items-center relative justify-between p-4 xxx rounded-lg z-0">
            <div class="flex justify-center items-center overflow-hidden">
                <div class="px-2 group/hover cursor-pointer">
                <div
                    class="border transition-3 border-black group-hover/hover:border-gray-500 w-5 h-5 p-3 rounded-full flex justify-center items-center"
					onclick="AchieveTask(${Counter})"
					id="AchieveTask${Counter}"
					>
                    <div class="hidden group-hover/hover:block">
                    <i class="fa-solid fa-check text-blue-800 font-bold"></i>
                    </div>
					</div>
					</div>
                <!-- Task Name -->
                <div class="h-full flex items-center px-2 gap-2">
                <div class="py-4 w-1 ${TaskColor}"></div>
                <div class="text-xl font-bold">${NewTaskName}</div>
                </div>
				</div>
				<button class="cursor-pointer" onclick="RemoveTask(${Counter})" id="Remove${Counter}"><i class="fa-solid fa-trash-can hover:text-red-600"></i></button>
				</div>`;
	TaskCont.appendChild(Task);
	// Update the Empty Tasks Page
	NoTasksPage();
	// Update the Number of Active Tasks
	ActiveTasks.textContent = `Active Habits (${HabitList.length})`;
	// Reset the Input
	document.getElementById("TaskInput").value = "";
};

// Show Or Hide The NoTasks Page

function NoTasksPage() {
	if (TaskList.length === 0) {
		EmptyTasks.classList.remove("hidden");
		ActiveTasks.classList.add("hidden");
	} else {
		EmptyTasks.classList.add("hidden");
		ActiveTasks.classList.remove("hidden");
		ActiveTasks.textContent = `Active Tasks (${TaskList.length})`;
	}
}

// Remove Task

function RemoveTask(ID) {
	TaskList.forEach((x) => {
		if (ID === x.Id) {
			console.log(TaskList.indexOf(x));
			TaskList.splice(TaskList.indexOf(x), 1);
		}
	});
	const TaskRemove = document.getElementById(`Task${ID}`);
	TaskRemove.remove();
	NoTasksPage();
}

// Check Completed Tasks

function AchieveTask(ID) {
	const TaskRemove = document.getElementById(`Task${ID}`);
	// Remove Task from Page
	TaskRemove.remove();
	// Remove Task from the List
	TaskList.forEach((x) => {
		if (ID === x.Id) {
			console.log(TaskList.indexOf(x));
			TaskList.splice(TaskList.indexOf(x), 1);
		}
	});
	NoTasksPage();
}

// Habit List
const HabitList = [];

// Add Habit
let HabitCounter = 0;
AddHabitButton.onclick = () => {
	HabitCounter++;
	const NewHabitName = document.getElementById("HabitInput").value;
	const HabitCont = document.getElementById("Habits");
	const NewHabit = document.createElement("div");
	NewHabit.setAttribute("id", `HabitContainer${HabitCounter}`);
	const RepeatedHabit = document.getElementById("RepeatedHabitStatement");
	let RepeatedBreak = false;
	// Filter
	if (NewHabitName === "" || NewHabitName === "" || NewHabitName === "_")
		return;
	HabitList.forEach((x) => {
		if (NewHabitName === x.HabitName) {
			console.log("There is already");
			RepeatedHabit.classList.remove("hidden");
			setTimeout(() => {
				RepeatedHabit.classList.add("hidden");
			}, 2000);
			RepeatedBreak = true;
		}
	});
	if (RepeatedBreak === true) {
		return "";
	}
	HabitList.push({ HabitName: NewHabitName, Id: HabitCounter });
	NewHabit.innerHTML = `<div
              id="Habit${HabitCounter}"
              class="bg-(--back-color) p-4 rounded-lg shadow-2xl flex flex-col gap-3"
            >
              <div class="flex justify-between items-center">
                <div class="text-2xl font-bold">${NewHabitName}</div>
                <div class="cursor-pointer" onclick="RemoveHabit(${HabitCounter})"><i class="fa-regular fa-trash-can hover:text-red-600"></i></div>
              </div>
              <div class="flex w-full justify-between">
                <div class="flex items-center gap-1">
                  <div>
                    <i
                      class="fa-solid fa-fire text-red-900 hover:text-red-500"
                    ></i>
                  </div>
                  <div id="DayStreak${HabitCounter}">0</div>
                  <div>day streak</div>
                </div>
                <div class="flex items-center justify-center gap-2 pr-3">
                  <div>Best :</div>
                  <div id="BestHabit${HabitCounter}">0</div>
                </div>
              </div>
              <div class="font-bold">Last 7 days</div>
              <div
                class="justify-between hidden sm:flex *:flex *:flex-col *:items-center *:gap-2 [&_.box]:p-4 *:**:first:bg-gray-300 *:**:first:rounded-xl"
              >
                <div>
                  <div class="px-1.5 py-1 box" id="RemoveBox${HabitCounter}">
                    <div class="hidden" id="RemoveHidden${HabitCounter}">
                      <i class="fa-solid fa-check text-green-600"></i>
                    </div>
                  </div>
                  <div>Fri</div>
                </div>
                <div>
                  <div class="box"></div>
                  <div>Sat</div>
                </div>
                <div>
                  <div class="box"></div>
                  <div>Sun</div>
                </div>
                <div>
                  <div class="box"></div>
                  <div>Mon</div>
                </div>
                <div>
                  <div class="box"></div>
                  <div>Tue</div>
                </div>
                <div>
                  <div class="box"></div>
                  <div>wed</div>
                </div>
                <div>
                  <div class="box"></div>
                  <div>Thu</div>
                </div>
              </div>
              <div
                class="cursor-pointer w-full bg-blue-400 flex justify-center hover:bg-green-600 items-center py-1.5 rounded-lg text-white capitalize font-bold"
				onclick="AchieveHabit(${HabitCounter})"
				id="BtnBg${HabitCounter}"
              >
                Check in today
              </div>
            </div>`;
	document.getElementById("HabitInput").value = "";
	HabitCont.appendChild(NewHabit);
	NoHabitsPage();
		// Update the Number of Active Tasks
	ActiveTasks.textContent = `Active Tasks (${TaskList.length})`;
};

// Show Or Hide The NoTasks Page

function NoHabitsPage() {
	if (HabitList.length === 0) {
		EmptyHabits.classList.remove("hidden");
		ActiveHabits.classList.add("hidden");
	} else {
		EmptyHabits.classList.add("hidden");
		ActiveHabits.classList.remove("hidden");
		ActiveHabits.textContent = `Active Habits (${HabitList.length})`;
	}
}

// Remove Habit

function RemoveHabit(ID) {
	HabitList.forEach((x) => {
		if (ID === x.Id) {
			console.log(HabitList.indexOf(x));
			HabitList.splice(HabitList.indexOf(x), 1);
		}
	});
	const HabitRemove = document.getElementById(`HabitContainer${ID}`);
	HabitRemove.remove();
	NoHabitsPage();
}

// Check Completed Tasks

function AchieveHabit(ID) {
	const BtnBg = document.getElementById(`BtnBg${ID}`)
	const Box = document.getElementById(`RemoveBox${ID}`);
	const Hidden = document.getElementById(`RemoveHidden${ID}`);
	document.getElementById(`DayStreak${ID}`).innerHTML = 1;
	document.getElementById(`BestHabit${ID}`).innerHTML = 1;
	Box.classList.remove("box");
	Hidden.classList.remove("hidden");
	BtnBg.classList.add("bg-green-600")
	NoTasksPage();
}
