import tkinter as tk
from tkinter import messagebox
import random

class ImposterGame:
    def __init__(self, root):
        self.root = root
        self.root.title("Imposter Guessing Game")
        self.root.geometry("600x750")
        
        # Game Data Storage
        self.players = []
        self.words_data = [] 
        
        # Variables for UI tracking
        self.imposter_count_var = tk.IntVar(value=1)
        
        # Runtime State
        self.current_roles = {} 
        self.current_round_word = {}
        self.player_view_index = 0
        self.imposters_in_round = []
        
        # Start
        self.show_welcome_screen()

    def clear_screen(self):
        for widget in self.root.winfo_children():
            widget.destroy()

    # ================= SCREEN 1: WELCOME =================
    def show_welcome_screen(self):
        self.clear_screen()
        
        lbl_title = tk.Label(self.root, text="Imposter Game", font=("Arial", 28, "bold"))
        lbl_title.pack(pady=60)
        
        btn_start = tk.Button(self.root, text="Start New Game", font=("Arial", 18), 
                              command=self.show_setup_screen, bg="#4CAF50", fg="white", padx=30, pady=15)
        btn_start.pack()

    # ================= SCREEN 2: SETUP =================
    def show_setup_screen(self):
        self.clear_screen()
        
        # --- 1. Player Entry Section ---
        frame_top = tk.Frame(self.root)
        frame_top.pack(fill=tk.X, padx=20, pady=10)

        lbl_p = tk.Label(frame_top, text="1. Add Players", font=("Arial", 14, "bold"))
        lbl_p.pack(anchor="w")
        
        frame_player_input = tk.Frame(frame_top)
        frame_player_input.pack(pady=5)
        
        self.entry_name = tk.Entry(frame_player_input, font=("Arial", 12), width=20)
        self.entry_name.pack(side=tk.LEFT, padx=5)
        
        btn_add_p = tk.Button(frame_player_input, text="+", font=("Arial", 12, "bold"), 
                              command=self.add_player, bg="#2196F3", fg="white", width=3)
        btn_add_p.pack(side=tk.LEFT)
        
        self.lbl_player_count = tk.Label(frame_top, text="Players added: 0", fg="#555", font=("Arial", 10))
        self.lbl_player_count.pack()

        # --- 2. Imposter Count Section (+ and - Buttons) ---
        frame_mid = tk.Frame(self.root)
        frame_mid.pack(fill=tk.X, padx=20, pady=10)
        
        lbl_imp = tk.Label(frame_mid, text="2. Imposter Count", font=("Arial", 14, "bold"))
        lbl_imp.pack(anchor="w")

        frame_imp_ctrl = tk.Frame(frame_mid)
        frame_imp_ctrl.pack(pady=5)

        btn_minus = tk.Button(frame_imp_ctrl, text="-", font=("Arial", 14, "bold"), 
                              command=self.decrease_imposter, width=4)
        btn_minus.pack(side=tk.LEFT, padx=10)

        self.lbl_imp_display = tk.Label(frame_imp_ctrl, textvariable=self.imposter_count_var, 
                                        font=("Arial", 24, "bold"), width=3, relief="sunken", bg="white")
        self.lbl_imp_display.pack(side=tk.LEFT, padx=10)

        btn_plus = tk.Button(frame_imp_ctrl, text="+", font=("Arial", 14, "bold"), 
                             command=self.increase_imposter, width=4)
        btn_plus.pack(side=tk.LEFT, padx=10)

        # --- 3. Word & Hint Entry Section (BIGGER) ---
        frame_words_area = tk.LabelFrame(self.root, text=" 3. Add Words & Hints ", font=("Arial", 16, "bold"), 
                                         bd=3, relief=tk.GROOVE, fg="#333")
        frame_words_area.pack(fill=tk.BOTH, expand=True, padx=20, pady=15)
        
        tk.Label(frame_words_area, text="Secret Word:", font=("Arial", 12)).pack(anchor="w", padx=20, pady=(10,0))
        self.entry_word = tk.Entry(frame_words_area, font=("Arial", 16), bg="#fffde7") 
        self.entry_word.pack(fill=tk.X, padx=20, pady=5)
        
        tk.Label(frame_words_area, text="Hint for Imposter:", font=("Arial", 12)).pack(anchor="w", padx=20, pady=(10,0))
        self.entry_hint = tk.Entry(frame_words_area, font=("Arial", 16), bg="#e0f7fa") 
        self.entry_hint.pack(fill=tk.X, padx=20, pady=5)
        
        btn_add_w = tk.Button(frame_words_area, text="Add Word to Pool", command=self.add_word_data, 
                              bg="#FF9800", fg="white", font=("Arial", 12, "bold"), pady=5)
        btn_add_w.pack(pady=15)
        
        self.lbl_word_count = tk.Label(frame_words_area, text="Words in Pool: 0", 
                                       font=("Arial", 18, "bold"), fg="#004D40")
        self.lbl_word_count.pack(pady=(0, 10))

        # --- Start Game Button ---
        btn_go = tk.Button(self.root, text="START GAME", font=("Arial", 16, "bold"), 
                           command=self.validate_and_start, bg="#2E7D32", fg="white", pady=10)
        btn_go.pack(side=tk.BOTTOM, fill=tk.X, padx=20, pady=20)

    # --- Logic for Buttons ---
    
    def increase_imposter(self):
        current = self.imposter_count_var.get()
        if len(self.players) > 0 and current >= len(self.players) - 1:
            return 
        self.imposter_count_var.set(current + 1)

    def decrease_imposter(self):
        current = self.imposter_count_var.get()
        if current > 1:
            self.imposter_count_var.set(current - 1)

    def add_player(self):
        name = self.entry_name.get().strip()
        if name:
            self.players.append(name)
            self.entry_name.delete(0, tk.END)
            self.lbl_player_count.config(text=f"Players added: {len(self.players)} ({', '.join(self.players)})")

    def add_word_data(self):
        word = self.entry_word.get().strip()
        hint = self.entry_hint.get().strip()
        
        if word and hint:
            self.words_data.append({'word': word, 'hint': hint})
            self.entry_word.delete(0, tk.END)
            self.entry_hint.delete(0, tk.END)
            self.lbl_word_count.config(text=f"Words in Pool: {len(self.words_data)}")
        else:
            messagebox.showwarning("Input Error", "Please enter both a word and a hint.")

    def validate_and_start(self):
        imp_count = self.imposter_count_var.get()

        if len(self.players) < 3:
            messagebox.showerror("Error", "Need at least 3 players.")
            return
        
        if imp_count >= len(self.players):
            messagebox.showerror("Error", "Too many imposters for this number of players!")
            return
            
        if len(self.words_data) == 0:
            messagebox.showerror("Error", "Please add at least one word/hint pair.")
            return

        self.prepare_new_round()

    # ================= LOGIC: ROUND PREP =================
    def prepare_new_round(self):
        if not self.words_data:
            self.show_game_over()
            return

        rand_index = random.randint(0, len(self.words_data) - 1)
        self.current_round_word = self.words_data.pop(rand_index)
        
        self.current_roles = {}
        count_req = self.imposter_count_var.get()
        
        if count_req >= len(self.players):
            count_req = 1
            
        self.imposters_in_round = random.sample(self.players, count_req)
        
        for p in self.players:
            if p in self.imposters_in_round:
                self.current_roles[p] = "IMPOSTER"
            else:
                self.current_roles[p] = "CIVILIAN"
        
        self.player_view_index = 0
        self.show_pass_device_screen()

    # ================= SCREEN 3: PASS DEVICE =================
    def show_pass_device_screen(self):
        self.clear_screen()
        
        current_player_name = self.players[self.player_view_index]
        
        lbl = tk.Label(self.root, text=f"Pass device to:\n\n{current_player_name}", font=("Arial", 22))
        lbl.pack(expand=True)
        
        # 'I am [Name]' Button
        btn = tk.Button(self.root, text=f"I am {current_player_name}", font=("Arial", 16), 
                        command=self.show_reveal_screen, bg="#2196F3", fg="white", padx=20, pady=10)
        btn.pack(pady=50)

    # ================= SCREEN 4: HOLD TO VIEW =================
    def show_reveal_screen(self):
        self.clear_screen()
        current_player_name = self.players[self.player_view_index]
        role = self.current_roles[current_player_name]
        
        lbl_name = tk.Label(self.root, text=f"{current_player_name}", font=("Arial", 20, "bold"))
        lbl_name.pack(pady=30)
        
        lbl_instr = tk.Label(self.root, text="Press and HOLD the button below\nto see your secret.", font=("Arial", 12))
        lbl_instr.pack()

        self.secret_label = tk.Label(self.root, text="???", font=("Arial", 26, "bold"), fg="#333")
        self.secret_label.pack(pady=40)

        if role == "IMPOSTER":
            self.reveal_text = f"YOU ARE THE IMPOSTER!\nHint: {self.current_round_word['hint']}"
            self.reveal_color = "red"
        else:
            self.reveal_text = f"Word: {self.current_round_word['word']}"
            self.reveal_color = "green"

        self.btn_hold = tk.Button(self.root, text="HOLD TO VIEW", font=("Arial", 16), bg="lightgray")
        self.btn_hold.pack(pady=10, ipady=15, ipadx=15)
        
        self.btn_hold.bind('<ButtonPress-1>', self.on_press_view)
        self.btn_hold.bind('<ButtonRelease-1>', self.on_release_view)

        # --- UPDATED BUTTON ---
        is_last_player = (self.player_view_index == len(self.players) - 1)
        btn_text = "START GAME >>" if is_last_player else "NEXT PLAYER >>"

        btn_next = tk.Button(self.root, text=btn_text, command=self.next_player_or_start, 
                             bg="#00C853", fg="white", font=("Arial", 20, "bold"))
        btn_next.pack(side=tk.BOTTOM, fill=tk.X, pady=20, padx=20, ipady=20)

    def on_press_view(self, event):
        self.secret_label.config(text=self.reveal_text, fg=self.reveal_color)

    def on_release_view(self, event):
        self.secret_label.config(text="???", fg="#333")

    def next_player_or_start(self):
        self.player_view_index += 1
        if self.player_view_index < len(self.players):
            self.show_pass_device_screen()
        else:
            self.show_gameplay_screen()

    # ================= SCREEN 5: GAMEPLAY =================
    def show_gameplay_screen(self):
        self.clear_screen()
        
        tk.Label(self.root, text="GAME STARTED!", font=("Arial", 26, "bold"), fg="blue").pack(pady=60)
        tk.Label(self.root, text="Ask questions and find the imposter.", font=("Arial", 14)).pack()
        
        btn_reveal = tk.Button(self.root, text="Display Imposter(s)", font=("Arial", 16), 
                               command=self.show_results_screen, bg="#f44336", fg="white", padx=20, pady=10)
        btn_reveal.pack(pady=50)

    # ================= SCREEN 6: RESULTS =================
    def show_results_screen(self):
        self.clear_screen()
        
        tk.Label(self.root, text="The Imposter(s):", font=("Arial", 18)).pack(pady=20)
        
        imposter_names = ", ".join(self.imposters_in_round)
        tk.Label(self.root, text=imposter_names, font=("Arial", 28, "bold"), fg="red").pack(pady=10)
        
        tk.Label(self.root, text=f"The Word was: {self.current_round_word['word']}", font=("Arial", 16)).pack(pady=10)
        
        remaining = len(self.words_data)
        btn_text = "Next Word" if remaining > 0 else "Finish Game"
        
        # --- HIDDEN WORD COUNT ---
        # Removed the ({remaining} left) text from the button below
        btn_next = tk.Button(self.root, text=btn_text, font=("Arial", 16), 
                             command=self.prepare_new_round, bg="#2196F3", fg="white", padx=20, pady=10)
        btn_next.pack(pady=50)

    # ================= SCREEN 7: GAME OVER =================
    def show_game_over(self):
        self.clear_screen()
        tk.Label(self.root, text="GAME OVER", font=("Arial", 30, "bold")).pack(pady=60)
        tk.Label(self.root, text="No more words left in the pool.", font=("Arial", 16)).pack()
        
        btn_restart = tk.Button(self.root, text="Setup New Game", font=("Arial", 16), 
                                command=self.restart_app, bg="#4CAF50", fg="white")
        btn_restart.pack(pady=40)
        
    def restart_app(self):
        self.players = []
        self.words_data = []
        self.imposter_count_var.set(1)
        self.show_welcome_screen()

if __name__ == "__main__":
    root = tk.Tk()
    app = ImposterGame(root)
    root.mainloop()