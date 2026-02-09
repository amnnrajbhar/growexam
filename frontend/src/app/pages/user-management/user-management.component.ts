import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management.component.html'
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  showForm = false;
  showPassword = false;
  createdPassword = '';
  isAuthenticated = false;
  authForm = { username: '', password: '' };
  userForm = {
    name: '',
    email: '',
    password: '',
    role: 'student'
  };
  editingUserId: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    const auth = sessionStorage.getItem('seedandview_auth');
    if (auth === 'true') {
      this.isAuthenticated = true;
      this.loadUsers();
    }
  }

  authenticate() {
    if (this.authForm.username === 'comica' && this.authForm.password === 'Orange@08') {
      this.isAuthenticated = true;
      sessionStorage.setItem('seedandview_auth', 'true');
      this.loadUsers();
    } else {
      alert('Invalid credentials');
    }
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  saveUser() {
    if (this.editingUserId) {
      this.userService.updateUser(this.editingUserId, this.userForm).subscribe(() => {
        this.resetForm();
        this.loadUsers();
      });
    } else {
      this.userService.createUser(this.userForm).subscribe(response => {
        this.createdPassword = response.plainPassword;
        this.showPassword = true;
        this.resetForm();
        this.loadUsers();
      });
    }
  }

  editUser(user: any) {
    this.userForm = {
      name: user.name,
      email: user.email,
      password: '',
      role: user.role
    };
    this.editingUserId = user._id;
    this.showForm = true;
  }

  deleteUser(id: string) {
    if (confirm('Delete this user?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.loadUsers();
      });
    }
  }

  resetForm() {
    this.userForm = { name: '', email: '', password: '', role: 'student' };
    this.editingUserId = null;
    this.showForm = false;
  }

  closePasswordModal() {
    this.showPassword = false;
    this.createdPassword = '';
  }
}
