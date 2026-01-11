import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  constructor(private apollo: Apollo) {}

  /* ===========================
     COMPLAINT MODULE
  ============================ */

  addComplaint(resident: string, flat: string, category: string, issue: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation AddComplaint($flat: String, $category: String, $issue: String) {
          addComplaint(flat: $flat, category: $category, issue: $issue) {
            id
            status
          }
        }
      `,
      variables: { flat, category, issue },
    });
  }

  getComplaints() {
    return this.apollo.query({
      query: gql`
        {
          complaints {
            id
            flat
            category
            issue
            status
            worker_name
            worker_phone
            visit_date
          }
        }
      `,
      fetchPolicy: 'network-only',
    });
  }

  assignWorker(id: number, worker: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation ($id: Int, $worker: String) {
          assignWorker(id: $id, worker: $worker) {
            id
            status
          }
        }
      `,
      variables: { id, worker },
    });
  }

  updateStatus(id: number, status: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation ($id: Int, $status: String) {
          updateStatus(id: $id, status: $status) {
            id
            status
          }
        }
      `,
      variables: { id, status },
    });
  }

  /* ===========================
     VISITOR MODULE (BUILD SAFE)
  ============================ */

  addVisitor(name: string, flat: string, purpose: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation ($name: String, $flat: String, $purpose: String) {
          addVisitor(name: $name, flat: $flat, purpose: $purpose) {
            id
          }
        }
      `,
      variables: { name, flat, purpose },
    });
  }
  getNotices() {
    return this.apollo.query({
      query: gql`
        {
          notices {
            id
            title
            message
            created_at
          }
        }
      `,
      fetchPolicy: 'network-only',
    });
  }

  /* ===========================
     NOTICE MODULE (BUILD SAFE)
  ============================ */

  login(email: string, password: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation ($email: String, $password: String) {
          login(email: $email, password: $password) {
            id
            name
            email
            role
          }
        }
      `,
      variables: { email, password },
    });
  }

  register(
    name: string,
    email: string,
    password: string,
    role: string,
    flat_no?: string // ✅ OPTIONAL
  ) {
    return this.apollo.mutate({
      mutation: gql`
        mutation Register(
          $name: String!
          $email: String!
          $password: String!
          $role: String!
          $flat_no: String
        ) {
          register(
            name: $name
            email: $email
            password: $password
            role: $role
            flat_no: $flat_no
          ) {
            id
          }
        }
      `,
      variables: { name, email, password, role, flat_no },
    });
  }

  addNotice(title: string, message: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation ($title: String, $message: String) {
          addNotice(title: $title, message: $message) {
            id
          }
        }
      `,
      variables: { title, message },
    });
  }

  /* ===========================
     BOOKING MODULE (BUILD SAFE)
  ============================ */

  addBooking(facility: string, flat: string, date: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation ($facility: String, $flat: String, $date: String) {
          addBooking(facility: $facility, flat: $flat, date: $date) {
            id
          }
        }
      `,
      variables: { facility, flat, date },
    });
  }
  getUsers() {
    return this.apollo.query({
      query: gql`
        query {
          users {
            id
            name
            email
            flat_no
          }
        }
      `,
      fetchPolicy: 'network-only',
    });
  }
  takeComplaint(data: any) {
    return this.apollo.mutate({
      mutation: gql`
        mutation TakeComplaint($id: Int!, $name: String!, $phone: String!, $date: String!) {
          takeComplaint(
            complaint_id: $id
            worker_name: $name
            worker_phone: $phone
            visit_date: $date
          )
        }
      `,
      variables: data,
    });
  }
  getAllComplaints() {
    return this.apollo.watchQuery<any>({
      query: gql`
        query {
          complaints {
            flat
            category
            issue
            status
            worker_name
            worker_phone
            visit_date
          }
        }
      `,
    }).valueChanges;
  }
  getWorkerComplaints() {
    return this.apollo.watchQuery<any>({
      query: gql`
        query {
          complaints {
            id
            flat
            category
            issue
            status
          }
        }
      `,
    }).valueChanges;
  }
  getResidentComplaints(flat: string) {
    return this.apollo.watchQuery<any>({
      query: gql`
        query ($flat: String!) {
          residentComplaints(flat: $flat) {
            category
            issue
            status
            worker_name
            worker_phone
            visit_date
          }
        }
      `,
      variables: { flat },
    }).valueChanges;
  }

  /* ===========================
     EMERGENCY MODULE
  ============================ */

  emergencyAlert(message: string, flat: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation ($message: String, $flat: String) {
          emergencyAlert(message: $message, flat: $flat) {
            id
          }
        }
      `,
      variables: { message, flat },
    });
  }
  deleteNotice(id: number) {
    return this.apollo.mutate({
      mutation: gql`
        mutation DeleteNotice($id: Int!) {
          deleteNotice(id: $id)
        }
      `,
      variables: { id },
    });
  }
}
