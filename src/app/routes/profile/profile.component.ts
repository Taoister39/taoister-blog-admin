import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Profile } from 'app/models/profile';
import { ProfileService } from 'app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  reactiveForm = this.fb.nonNullable.group({
    author: ['', [Validators.required]],
    slogan: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    avatar: ['', [Validators.required]],
    github: ['', [Validators.required]],
    site: ['', [Validators.required]],
    twitter: ['', [Validators.required]],
  });

  private profile?: Profile;

  constructor(private fb: FormBuilder, private profileService: ProfileService) {}
  ngOnInit(): void {
    this.getProfile();
  }

  private getProfile() {
    this.profileService.getOne().subscribe(response => {
      this.profile = response.data;
    });
  }

  submit() {
    if (!this.reactiveForm.valid) return;

    const id = this.profile?.id;
    if (id) {
      this.profileService.update(id, this.reactiveForm.value).subscribe();
    } else {
      this.profileService.createOne(this.reactiveForm.value).subscribe();
    }
  }

  reset() {
    this.reactiveForm.reset();
  }

  fillProfile() {
    const profile = this.profile;
    if (profile) {
      this.reactiveForm.setValue({
        author: profile.author ?? '',
        avatar: profile.avatar ?? '',
        email: profile.email ?? '',
        github: profile.github ?? '',
        site: profile.site ?? '',
        slogan: profile.slogan ?? '',
        twitter: profile.twitter ?? '',
      });
    }
  }
}
