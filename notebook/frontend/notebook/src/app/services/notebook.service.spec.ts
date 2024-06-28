import { TestBed } from '@angular/core/testing';

import { NotebookService } from './notebook.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { notes } from '../test_data/testdata';
import { Notebook } from '../interface/notebook';
import { Res } from '../interface/res';

describe('NotebookService', () => {
  let service: NotebookService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NotebookService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(NotebookService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should get all notebooks', () => {
    service.getAllNotebooks().subscribe((res) => {
      expect(res).toBeTruthy();
      expect(res.length).toBe(notes.length);
      const note = res.find(
        (note) => note.id === '33e4b4bb-3aaf-44f9-83a2-e16a3c4fdea0'
      );
      expect(note?.title).toBe('new notebook title');
    });

    const req = httpTestingController.expectOne(
      'http://localhost:3004/notebook/getall'
    );
    expect(req.request.method).toEqual('GET');

    req.flush({
      success: true,
      message: 'Notebooks fetched successfully',
      data: notes,
    });
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update a notebook', () => {
    const updatedNotebook: Notebook = {
      id: '299f99fe-f841-4648-af7c-7d957d085300',
      title: 'updated notebook title2',
      description: 'updated notebook description',
      author: 'John Doe',
    };

    service.updateNotebook(updatedNotebook).subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const req = httpTestingController.expectOne(
      `http://localhost:3004/notebook/update/${updatedNotebook.id}`
    );
    expect(req.request.method).toEqual('PUT');

    req.flush({
      success: true,
      message: 'Notebook updated successfully',
      data: updatedNotebook,
    });
  });

  it('should get a notebook by id', () => {
    service
      .getNotebookById('299f99fe-f841-4648-af7c-7d957d085300')
      .subscribe((res) => {
        expect(res).toBeTruthy();
        expect(res.id).toBe('299f99fe-f841-4648-af7c-7d957d085300');
      });
    const req = httpTestingController.expectOne(
      'http://localhost:3004/notebook/getone/299f99fe-f841-4648-af7c-7d957d085300'
    );
    expect(req.request.method).toEqual('GET');
    req.flush({
      success: true,
      message: 'Notebook fetched successfully',
      data: notes[0],
    });
  });

  //create a notebook
  it('should create a notebook', () => {
    const newNotebook: Notebook = {
      title: 'new notebook title',
      description: 'new notebook description',
      author: 'John Doe',
    };
    service.createNotebook(newNotebook).subscribe((res) => {
      expect(res).toBeTruthy();
    });
    const req = httpTestingController.expectOne(
      'http://localhost:3004/notebook/create'
    );
    expect(req.request.method).toEqual('POST');
    req.flush({
      success: true,
      message: 'Notebook created successfully',
      data: newNotebook,
    });
  });

  it('should delete a notebook', () => {
    const notebookId = '299f99fe-f841-4648-af7c-7d957d085300';

    service.deleteNotebook(notebookId).subscribe((res: Res) => {
      expect(res).toBeTruthy();
      expect(res.success).toBe(true);
      expect(res.message).toBe('Notebook deleted successfully');
      expect(res.data).toBeNull();
    });

    const req = httpTestingController.expectOne(
      `http://localhost:3004/notebook/delete/${notebookId}`
    );
    expect(req.request.method).toEqual('DELETE');

    req.flush({
      success: true,
      message: 'Notebook deleted successfully',
      data: null,
    });
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
