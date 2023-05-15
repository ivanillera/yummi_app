import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { FilestackModule } from '@filestack/angular';
import { ToastrModule } from 'ngx-toastr';

import { PerfilComponent } from './perfil.component';

describe('PerfilComponent', () => {
    let fixture: ComponentFixture<PerfilComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                ToastrModule.forRoot(),
                BrowserModule,
                FormsModule,
                ReactiveFormsModule,
                RouterTestingModule,
                FilestackModule],
            declarations: [ PerfilComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PerfilComponent);
        fixture.detectChanges();
    });

    it('Expect PerfilComponent Creation', () => {
        const fixture = TestBed.createComponent(PerfilComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it('ponerApuntes', () => {
        const fixture = TestBed.createComponent(PerfilComponent);
        const app = fixture.componentInstance;
        expect(app.ponerApuntes).toBeTruthy();
        app.ponerApuntes();
        fixture.detectChanges();
        expect(app.apuntes).toBe(true);
        expect(app.perfil).toBe(false);
    });

    it('ponerInfo', () => {
        const fixture = TestBed.createComponent(PerfilComponent);
        const app = fixture.componentInstance;
        expect(app.ponerInfo).toBeTruthy();
        app.ponerInfo();
        fixture.detectChanges();
        expect(app.apuntes).toEqual(false);
        expect(app.perfil).toEqual(true);
    });


});
