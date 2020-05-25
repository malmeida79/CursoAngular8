import { Component, OnInit } from '@angular/core';
import { Course } from './course';
import { CourseService } from './course.service';

@Component({
    selector: 'app-course-list',
    templateUrl: './course-list.component.html'
})
export class CourseListComponent implements OnInit {

    filteredCourses: Course[] = [];

    private courses: Course[] = [];
    private filterBy: string;

    constructor(private courseService: CourseService) {

    }

    ngOnInit(): void {
        this.courses = this.courseService.retieveAll();
        this.filteredCourses = this.courses;
    }

    set filter(value: string) {
        this.filterBy = value;

        this.filteredCourses = this.courses.filter(
            (course: Course) => course.name.toLocaleLowerCase().indexOf(this.filterBy.toLocaleLowerCase()) > -1
        );
    }

    get filter() {
        return this.filterBy;
    }

}
