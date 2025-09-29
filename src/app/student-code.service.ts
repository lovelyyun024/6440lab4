import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentCodeService {
  
  constructor() {}

  // This is given as an example of the client, do not modify it.
  example_searchObservations(client, loincCode): Observable<any> {
    let queryParams = new URLSearchParams();
    queryParams.set('patient', client.patient.id);
    queryParams.set('code', loincCode);
    queryParams.set('_sort', '-date');
    return from<any[]>(client.request("Observation?" + queryParams, {flat: true}))
  }

  exercise_0_testScopes(): string {
    // Add the additional two scopes here.
    return 'launch profile openid online_access patient/Patient.read patient/Observation.read patient/MedicationRequest.*';
  }

  exercise_1_searchMedicationRequests(client): Observable<any> {
    // STUDENT TODO: Write your code here.

    // The following line is a placeholder so the code compiles. Replace it with a return similar to the example.
    // return of([]); // STUDENT TODO: Remove me.
    const queryStr = `MedicationRequest?patient=${client.patient.id}`;
    // flat: true will return a flat array of the resources instead of bundle.
    return from<any[]>(
      client.request(queryStr, { flat: true })
    .catch(error => {
      // console.error('Failed to get medication requests:', error);
      throw error;
    })
    );

  }

  // http://docs.smarthealthit.org/client-js/client.html
  exercise_2_updateMedicationRequest(client, resource: any, status: string): Observable<any> {
    // return of({}); // STUDENT TODO: Remove me.
    const updatedStr = { ...resource, status: status };
  
    // return client.update(updatedStr )
    //   .then((saved: any) => [saved])
    //   .catch(error => {
    //     // console.error('Failed to update medication request:', error);
    //     throw error;
    //   });

    return from(
      client.update(updatedStr )
      .then((saved: any) => [saved])
      .catch(error => {
        // console.error('Failed to update medication request:', error);
        throw error;
      })
    );
  }

  exercise_3_createMedicationRequest(client, medicationName: string): Observable<any> {
    // return of({}); // STUDENT TODO: Remove me.
    // resourceType,
    // status (should be set to "draft")
    // intent (should be set to "order")
    // subject (should be a reference to the current patient)
    // medicationCodeableConcept.text (should be set to the string passed in by the form)
    // DO NOT SET ANY OTHER VALUES IN THIS FIELD, ONLY TEXT!
    const payload = {
      resourceType: 'MedicationRequest',
      status: 'draft',
      intent: 'order',
      subject: { reference: `Patient/${client.patient.id}` },
      medicationCodeableConcept: { text: medicationName }
    };
 
    return from<any[]>(
      client.create(payload).then((created: any) => [created])
      .catch(error => {
        // console.error('Failed to create medication requests:', error);
        throw error;
      })
    );
  }
}
