import { Component, OnInit } from '@angular/core';
import { Course } from './course';
import { CourseService } from './course.service';

@Component({
    templateUrl: './course-list.component.html'
})
export class CourseListComponent implements OnInit {

    filteredCourses: Course[] = [];

    private courses: Course[] = [];
    private filterBy: string;

    constructor(private courseService: CourseService) {

    }

    ngOnInit(): void {
        this.retrieveAll();
    }

    retrieveAll(): void {
        this.courseService.retieveAll().subscribe({
            // ao executar um sobsribe e obter sucesso sera retornado um next
            // e nesse receberei entao a lista consultada
            next: courses => {
                this.courses = courses;
                // essa linha foi movida para ca pq como a execução e assicrona somente nesse ponto
                // consigo ter certeza de que o objeto ja foi retornado. Onde estava antes do lado de
                // fora do observable eu poderia seguir com a execução do código sem ter de fato a
                // resposta.
                this.filteredCourses = this.courses;
            },
            error: err => {
                // caso tenhamos algum erro no observable passará por aqui
                console.log('Error', err);
            }
        });

    }

    deleteById(courseId: number): void {
        this.courseService.deleteById(courseId).subscribe({
            next: () => {
                console.log('Deleted with success');
                // apos excluir atualiza a lista de cursos
                this.retrieveAll();
            },
            error: err => console.log('Error', err)
        });
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
